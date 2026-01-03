+++
date = "2026-01-03T11:53:50+01:00"
title = "Devlog 2 - I'll never play chess again"
+++

Last year, at the start of the year, I made this website.

Back then, I [wrote](/devlogs/devlog-0/) about how I made this website. I'm not the best at finishing things, but one thing I got done was this website. After that, there wasn't really anything to write about, since all my projects kept being unfinished on my computer, or [GitHub](https://github.com/LukasElias).

I had one project I made a long time ago, that was supposed to be for my brother as a birthday gift. But let's just say I overestimated my abilities and tried writing a Chess Engine in a few weeks.

And that was when I made my **first mistake**, I overestimated my abilities and tried doing something painfully complex in a really short amount of time.

## What's special about this project?

Is what you might be thinking, and if you aren't... well idk think again and follow along.

So this project that I started the 24th January of 2024, I never got around to finish. Until, somebody told me that I should finish some of the stuff I make. I even told myself that in the last ["devlog"](/devlogs/devlog-1/) if you can even call it that.

So now, it's done, well working, not the best, but it's a nice Minimum Viable Product. I spent a few months working on it instead of making a lot of other projects for no reason, and now I don't feel like ever playing chess again.

## How does it work?

It's just minimax

Now if you're wondering what that is, go read this [article](https://www.chessprogramming.org/Minimax)

I'm just kidding, just watch this [video](https://www.youtube.com/watch?v=l-hh51ncgDI)

I'm still kidding, I am gonna try to explain it to you, but these have been my sources.

[Chess Programming](https://www.chessprogramming.org) have been a really big help in making this, because I haven't actually invented anything in the making of "my" chess engine. It's all just been a bunch of smarter people, that made some algorithms for me to implement in rust.

### What's minimax?

Minimax is an [algorithm](https://en.wikipedia.org/wiki/Algorithm), made to let computers play any move-based two-player game.

It works by making a big tree of moves. Then at the of the tree, it evaluates every position it ends up on based on some rules you make. Now it just have to choose the move the moves closest to the "best" situation for itself.

Here's a little diagram I made in GIMP:

![A diagram should appear... well that's a shame](/images/minimax.png)

Here the root of the tree, up in the top, is the current position of the game. Then when a move is made, you go down and switch player, now it's blue's turn. And then you just continue until you don't wanna go more, for my engine I ended up picking a depth of 4.

The two players are called the maximizing player, and the minimizing player, hence the name minimax. In my diagram the maximizing player is painted red and the minimizing blue. For the maximizing player, a bigger number is better and it's opposite for the minimizing player.

When the engine runs, it plays as the maximizing player, and for each move it can make it tries to figure out what the minimizing player (it's opponent) would do. So if we look at the first branch, now the opponent can make two moves. From there the tree keeps on growing until it reaches the depth.

Now it has reached the depth, and it runs a few checks to figure out what score to give, so that it's a higher score if it's better for the maximizing player and lower if it's better for the minimizing player. This is called a static evaluation, I'll get more in depth about this later on in the article.

But now the engine needs to play for its opponent, the minimizing player. It does this by choosing the lowest score, so -2 in the case of the diagram. Then it does this for each branch, and eventually get up back to the root.

The maximizing player now chooses the biggest score, and takes the move associated with it. And it continues on doing this until the game is over.

### Sooo what about evaluation?

Right here you get a lot of freedom to make the engine however you like, but I know that I'm a bad chess player and I wouldn't be able to make anything useful, sooo I ended up doing something people had already done for a while.

On the Chess Programming website, I found [this article](https://www.chessprogramming.org/Simplified_Evaluation_Function). This is a really simple way of doing a static evaluation, but I also just wanted something working after having had this project not being able to play for nearly two years at this point. It's actually based on an email from polish [Tomasz Michniewski](https://www.chessprogramming.org/Tomasz_Michniewski) about a chess engine tournament.

So there are two parts of this evaluation:

1. Counting the amount of pieces and giving them an appropriate value depending on how important a piece they are.
2. Look at where the pieces are places on the board.

So the first part of this is pretty simple, you just have to look give each piece a specific value. In chess engines a typical way of measuring piece values, are with centipawns, and as the name suggests it's 1/100 of a pawns value.

In the article he does a bunch of "rules" where he tries to make the piece values balanced, he ends up with these:

| Piece  | Value |
| -----  | ----- |
| Pawn   | 100   |
| Knight | 320   | 
| Bishop | 330   | 
| Rook   | 500   | 
| Queen  | 900   | 
| King   | 20000 | 

Now the second part of the article is about where the pieces are places. Here you use something called a Piece-Square Table or a PST.

This is for example how it looks for the knight:

|     |  A  |  B  |  C  |  D  |  E  |  F  |  G  |  H  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  8  | -50 | -40 | -30 | -30 | -30 | -30 | -40 | -50 |
|  7  | -40 | -20 |   0 |   0 |   0 |   0 | -20 | -40 |
|  6  | -30 |   0 |  10 |  15 |  15 |  10 |   0 | -30 |
|  5  | -30 |   5 |  15 |  20 |  20 |  15 |   5 | -30 |
|  4  | -30 |   0 |  15 |  20 |  20 |  15 |   0 | -30 |
|  3  | -30 |   5 |  10 |  15 |  15 |  10 |   5 | -30 |
|  2  | -40 | -20 |   0 |   5 |   5 |   0 | -20 | -40 |
|  1  | -50 | -40 | -30 | -30 | -30 | -30 | -40 | -50 |

It's a Table where each Square gets a value, and if a Piece is on it that value gets put to the overall score in the evaluation.

The PST you're looking at encourages the knight to stay in the center so it have lots of places to move and gets punished if it stays in the edges of the board.

The only thing in the evaluation function I did myself, was to add a few points if the player could castle.

But since you now know how the engine works, you might be asking, how does it play against a human, and that leads us to the next thing.

## How does it play with you?

Ever since computers got build this has been a great question, and the answer is a protocol or an interface. In this scenario the protocol is called [Universal Chess Interface](https://www.chessprogramming.org/UCI) or UCI.

Now you don't need to think about getting user input or anything, since your engine will only be talking to another program handling all the user input and drawing boards on the screen etc... I used a program called [Arena](https://www.playwitharena.de/), it works, but it's a really old GUI. But hey, if it ain't broke don't fix it.

Now I only need to implement UCI however you do that, turns out it's pretty simple, but I spent way too much time working on this part because I forgot it just had to simply work and overestimated my abilities... again, **second mistake**.

### So how does UCI work?

The official documentation for UCI is right [here](https://www.wbec-ridderkerk.nl/html/UCIProtocol.html), this isn't the article on Chess Programming, but this is the official docs.

The UCI protocol is utilizing what computers are really good at, sending text. There are two parties in the protocol, the engine and the GUI. The GUI chooses what happens at all times, so if it wants to, it could make the engine switch up and calculate a whole new game.

But there are two commands from the GUI that are really important:

1. position
2. go

The position command gets sent with some extra position data, it tells the engine that this is the current position that it should put up.

The go command tells the engine it should just go and calculate what move it wanna play, there's also a bunch of extra things that can be passed with this command but it's not really essential for it to work. When the engine is done calculating it sends back a bestmove command with the move it thinks was the best.

Here's an example with a few moves, the --> is GUI to Engine and <-- is Engine to GUI:

--> position startpos moves e2e4
--> go wtime 246000 btime 240000 winc 6000 binc 6000
<-- bestmove b8c6

--> position startpos moves e2e4 b8c6 f1c4
--> go wtime 242452 btime 245799 winc 6000 binc 6000
<-- bestmove c6e5

--> position startpos moves e2e4 b8c6 f1c4 c6e5 c4b3
--> go wtime 225655 btime 251552 winc 6000 binc 6000
<-- bestmove g8f6

--> position startpos moves e2e4 b8c6 f1c4 c6e5 c4b3 g8f6 f2f4
--> go wtime 219519 btime 257373 winc 6000 binc 6000
<-- bestmove f6e4

Here you can see some extra things for the go commands, the GUI just says how much time is left and how much time the players get incremented by every move.

And this is basically all you need.

Now go compile it for yourself and install something like Arena or a better program if you find one.

[Here is the source code](https://github.com/LukasElias/ChessEngine)

If anybody thinks that I should make a more sophisticated chess engine, like my little brother thinks for some reason, pls just go make a pull request. I'll probably accept it since my code can't get any worse than it is already.
