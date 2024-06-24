const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const app = express();
const port = 2000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Error connecting to MongoDB", error);
});

const User = require('./models/user');
const Chat = require("./models/message");

async function sendEmail(userEmail, message) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Reset Password',
      html: `<b>${message}</b>`
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function generateCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isStrongPassword(password) {
  const requirements = [];
  if (password.length < 8) requirements.push('Password must be at least 8 characters long.');
  if (!/[A-Z]/.test(password)) requirements.push('Password must contain at least one uppercase letter.');
  if (!/[a-z]/.test(password)) requirements.push('Password must contain at least one lowercase letter.');
  if (!/[0-9]/.test(password)) requirements.push('Password must contain at least one digit.');
  if (!/[!@#$%^&*]/.test(password)) requirements.push('Password must contain at least one special character.');

  return {
    strong: requirements.length === 0,
    missingRequirements: requirements
  };
}

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: newUser._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the user details' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/matches', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let filter = {};

    if (user.gender === 'Men') {
      filter.gender = 'Women';
    } else if (user.gender === 'Women') {
      filter.gender = 'Men';
    }

    if (user.type) {
      filter.type = user.type;
    }

    const currentUser = await User.findById(userId)
      .populate('matches', '_id')
      .populate('likedProfiles', '_id');

    const friendIds = currentUser.matches.map(friend => friend._id);
    const crushIds = currentUser.likedProfiles.map(crush => crush._id);

    const matches = await User.find(filter)
      .where('_id')
      .nin([userId, ...friendIds, ...crushIds]);

    return res.status(200).json({ matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/like-profile", async (req, res) => {
  try {
    const { userId, likedUserId, image, comment } = req.body;

    await User.findByIdAndUpdate(likedUserId, {
      $push: {
        receivedLikes: {
          userId: userId,
          image: image,
          comment: comment,
        },
      },
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        likedProfiles: likedUserId
      }
    });

    res.status(200).json({ message: "Profile liked successfully" });
  } catch (error) {
    console.error('Error liking profile:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/received-likes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const likes = await User.findById(userId)
      .populate('receivedLikes.userId', 'firstName imageUrls prompts')
      .select('receivedLikes');

    res.status(200).json({ receivedLikes: likes.receivedLikes });
  } catch (error) {
    console.error('Error fetching received likes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/create-match', async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { likedProfiles: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { matches: selectedUserId },
      $pull: { receivedLikes: { userId: selectedUserId } },
    });

    res.status(200).json({ message: 'ReceivedLikes updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating a match', error });
  }
});

app.get("/get-matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("matches", "firstName imageUrls");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = user.matches;
    res.status(200).json({ matches });
  } catch (error) {
    console.error('Error getting matches:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

io.on('connection', socket => {
  console.log('a user is connected');
  socket.on('sendMessage', async data => {
    try {
      const { senderId, receiverId, message } = data;

      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      io.to(receiverId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.log("Error handling the message", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(8000, () => {
  console.log('Socket.IO server running on port 8000');
});

app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate('senderId', '_id name');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error getting messages", error });
  }
});

app.post('/resetPassword', async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found.');
      return res.status(404).send({ success: false, message: 'User not found.' });
    }

    const token = await generateCode(5);
    user.resettoken = token;
    user.resettokenExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();

    await sendEmail(email, `Here is your Reset Token: ${token}`);
    return res.send({ success: true, message: 'Email sent with reset token.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server problem' });
  }
});

app.post('/ResetPasswordConfirmation', async (req, res) => {
  try {
    const { email, verificationCode, password } = req.body;
    const user = await User.findOne({ email });

    const passwordStrength = isStrongPassword(password);
    if (!passwordStrength.strong) {
      return res.send({ success: false, message: passwordStrength.missingRequirements.join('\n') });
    }

    if (!user || user.resettoken !== verificationCode) {
      return res.status(400).send({ success: false });
    }

    if (user.resettokenExpiration < new Date()) {
      return res.status(500).send({ success: false, message: 'Token has expired.' });
    }
// Store password directly without hashing
user.password = password;

// Reset token and expiration
user.resettoken = '';
user.resettokenExpiration = null;

    await user.save();
    return res.status(200).send({ success: true , message:"Successfully done .you can login again "});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "An error occurred. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
