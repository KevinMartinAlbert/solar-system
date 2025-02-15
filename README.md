# The solar system

Here is my first attempt at recreating the solar system and my first project with three.js.

I started this project with the intention of learning three.js so I have been very minimalistic with the code structure and soon realized that the solar system is complex. I'll probably make a much cleaner version in a few months including the planetary systems, the asteroid belt between Mars and Jupiter, the ISS and more, there are lots of stuff flying around.

## Potential ideas for next version

- think things first and model a class diagram with plantUML before coding. the solar system and 3D get complex very quickly
- abstract class for systems => class for solar system, class for planetary system
- abstract class for star => sun, terrestrial planet, gas giant, moons, rings, satellites
- camera class for better handling of points of views
- array cam for virtual reality
- light class for light creation and management (reflection, radiosity)

...

- spend more time on CSS ? ... // _Sitcom laugh tracks_ //

## How I work

I start a new project every two weeks, and I won't continue or improve a project past that time. This is a way to challenge myself into learning new things rapidly. My various projects can be rough around the edges or reflect poor code structure. This is part of learning, I only get better after every mistake.

I also intend to remake some projects in the future and that's one big reason why I don't put more than two weeks into a project. I know I'll redo it much better in a few months, I want to see my progress.

For the solar system, my goal was to learn a bit of Three.js and I achieved what I wanted. Obviously the code structure is way too simplistic and the solar system is a star system of planetary systems. The code doesn't reflect that and make it hard to develop more on top of it. Another thing is that a planet can have multiple moons, I could have changed the classes to have an array of object as a property of a planet and changed the logic of the code but once again, there are better ways to do it and i'll redo this projects in a few months.

## Thanks

Thanks to Wael Yasmina for the boilerplate he provided.
