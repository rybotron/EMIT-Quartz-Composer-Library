EMIT Quartz Composer Library
============================

The goal of this project is to create a library that is easy to use and has a low-level of complexity to get artists building dynamic, reactive, and generative graphics faster.


## Usage ##

1. Download the [complete library and examples](http://bit.ly/HNzYf2)

2. Then copy the contents of the *Quartz Composer Patches* folder into your *Users/YourUsername/Library/Quartz Composer Patches*

3. Restart Quartz Composer and then start with the Example Compositions in the Examples folder


## Changelog ##

###r1 Initial Release ###
+ Iterator Tools
  * Oscillator
  * Interpolation
  * Random
  * Even Scale
  * Even X & Y Position
  * Color Random
  * Sample & Hold Value
+ Number Tools
  * Value Translation
+ Patch Time Tools
  * BPM Patch Time with Rate and Audio Acceleration

###r2###
######Changes
+ Iterator Tools
  * Interpolation
    * Added Reverse
  * Color Random
    * Added Random Seed
    * Added Smooth Duration
  * Sample & Hold
    * Added Hold Value output
  * Even Y Position
    * Default spacing to 1
    * Added Reverse order
  * Even X Position
    * Added Reverse order

######New
+ Iterator Tools
  * Color Ordered
  * Iteration Delay
  * Show Index
  * Iterator Patch Time
+ Structure Tools
  * XYZ to Structure
  * Structure to XYZ
  * XYZ Structure Smoother
+ Shapes
    * Sphere
    * Grid
    * Helix
    * Cook Random Sphere
+ Number Tools
    * XYZ Smoother
+ After Effects Keyframe Parser
    * AE Script for exporting keyframes from After Effects to XML
    * XML Loader
    * AE XML Parser
