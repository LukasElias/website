+++
date = '2025-01-05T16:25:07+01:00'
title = 'Devlog 0 - this website'
+++

Hello everyone, this is the first devlog I made on my website. In this devlog I'll be explaining why I made this website and how I made it using hugo. Ofc we're using catppuccin, because it's goated.

## Why did I make this website?

So first of all, I would recommend you checked out this page called [about](/about).

So now I guess you got an idea of who I am. Well that's great, let me tell you why I made this website now. So it all started in my backyard, when I was around 12 [i think](https://open.spotify.com/track/4f8Mh5wuWHOsfXtzjrJB3t?si=aca5a91e30e54199), and jumped on our trampoline. On the trampoline I got a great idea. I wanted to make a game (I could code a bit back then, since I'd learned some programming with the micro:bit and Makecode if you know those), a game about jumping, jumping with a trampoline. So what do you think of that idea? You probably need to know a bit more about the idea right? You can hear that in future devlogs. But that was when it all started. So now what does this have to do with the website thing you might ask (you asked that right? Well you get an answer now).

So now here we are, in 2025, and I should do something about this idea my brain have been cooking the last few years. The idea has grown bigger, and I've had a raspberry pi 4B which doesn't do anything {{< tooltip "rn" "still means right now" >}}. So this sounds perfect for creating a website, where I could share this idea and how I'll be making it. Then I could get feedback from everyone reading, and I could potentially also share my other projects (some of them is already on [GitHub](https://github.com/LukasElias) {{< tooltip "btw" "If you did what I told you to, you read the about page first where I explain what this means" >}}).

## How did I make it?

This website is made with [hugo](https://gohugo.io). This is a static site generator (writtin in go btw), and sounds really fancy, but it's not as complicated as any JS framework today, since it's all just HTML.

So the static site generator basically takes some files you write, and generates the static html files on the site, with a layout you create.

If you wanna see the source code for this website, it's all available on [GitHub](https://github.com/LukasElias/website).

In hugo all the files it generates that is supposed to be accesible to the internet, like the page you're viewing right now. Is gonna be written to the public directory, this is somewhere you shouldn't touch. Because you didn't get permission from hugo to touch its files, always ask for permission for files you didn't make. Just kidding, they're gonna get overwritten when hugo rebuilds your page.

So in hugo, there's four main directories you write in:
1. assets/
2. content/
3. layouts/
4. static/

So the assets directory is the one you put image/css/javascript files, these files can then be processed by you, fx you could bundle all your js and css together so they are one big file. If you instead have files like robots.txt that's not supposed to be processed and just copied over to the public directory, you should put those files in the static directory.

The content directory is for the content that's showing on the page. This is written in markdown files, if you've ever seen a git repo, you've probably seen a README.md file, which is just markdown. Markdown is like html not a programming language, but a markup language, hence the name. That's also what I'm writing in right now.

The last one is layouts, this is for how hugo is using the content files and making them to pages. And then I just made some docker containers that could run, build the page and serve it with nginx. And I also have one container running Cusdis, which is a commenting system. You can try to add a comment at the bottom. And then me and my dad did spend a weekend setting up a reverse proxy, so the requests get send to the raspberry pi. But that's it!
