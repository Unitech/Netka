
# Ponolu 6 servo control

Notes:
- Use Node.js [0.12](https://www.npmjs.com/package/serialport#which-version-of-serialport-would-you-like-documentation-for) to use pololu-maestro node.js lib
- With ./legacy-ponolu/MaestroControlCenter switch Serial mode to USB Chained mode
- chmod 666 /dev/ttyACM0 or sudo usermod -aG dialout <username> then logout
- node index.js
