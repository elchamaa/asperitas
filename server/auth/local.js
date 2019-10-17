const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const ips = username.split('-');
      if (ips[0] == 'anonymous') {
        const ip = ips[1]+'.'+ips[2]+'.'+ips[3]+'.'+ips[4];
        const user = await User.create({ username, password, ip });
        return done(null, user.toJSON());
      } else {
        return done(null, false, { message: 'user not found' });
      }
    }
    const valid = await user.isValidPassword(password);
    if (!valid) return done(null, false, { message: 'invalid password' });

    return done(null, user.toJSON());
  } catch (err) {
    done(err);
  }
});

module.exports = localStrategy;
