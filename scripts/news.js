const tweets = [
	`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What have I done.. <a href="https://t.co/AmTncElGsz">pic.twitter.com/AmTncElGsz</a></p>&mdash; CodanRaigen21 (@real_cr21) <a href="https://twitter.com/real_cr21/status/1684543792144166914?ref_src=twsrc%5Etfw">July 27, 2023</a></blockquote>`,
	`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">In a few minutes <a href="https://t.co/y8qAr7PhmD">pic.twitter.com/y8qAr7PhmD</a></p>&mdash; CodanRaigen21 (@real_cr21) <a href="https://twitter.com/real_cr21/status/1686259382919614464?ref_src=twsrc%5Etfw">August 1, 2023</a></blockquote>`,
	`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Speedrunning adding all my add-on content before deployment. <a href="https://t.co/TXGj1SUEO1">pic.twitter.com/TXGj1SUEO1</a></p>&mdash; CodanRaigen21 (@real_cr21) <a href="https://twitter.com/real_cr21/status/1689763903268392960?ref_src=twsrc%5Etfw">August 10, 2023</a></blockquote>`
]

tweets.forEach(t =>{
	document.querySelector('.contentHolder').innerHTML += t;
})