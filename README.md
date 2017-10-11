
## Raspberry PI + Navio+

### Wifi configuration

**/etc/wpa_supplicant/wpa_supplicant.conf**
https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md


## Install Mission planner for ubuntu

Go to http://firmware.ardupilot.org/Tools/MissionPlanner/ top download mission planner
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb http://download.mono-project.com/repo/debian wheezy main" | sudo tee /etc/apt/sources.list.d/mono-xamarin.list
sudo apt-get update
sudo apt-get install mono-complete festival
mono MissionPlanner.exe
```
