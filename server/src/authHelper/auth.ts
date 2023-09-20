import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user/userModel';

const register = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

     const existingUserWithEmail = await User.findOne({ email });
     if (existingUserWithEmail) {
       return res.status(400).json({ message: 'Email address already in use.' });
     }
     
    const hashedPass = await bcrypt.hash(password, 10)

    const user = new User({
      email: email,
      password: hashedPass,
    })

    await user.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default { register }
