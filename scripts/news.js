const tweets = [
	`<blockquote class="twitter-tweet"><a href="https://twitter.com/real_cr21/status/1684543792144166914?ref_src=twsrc%5Etfw"></a></blockquote>`,
	`<blockquote class="twitter-tweet"><a href="https://twitter.com/real_cr21/status/1686259382919614464?ref_src=twsrc%5Etfw"></a></blockquote>`,
	`<blockquote class="twitter-tweet"><a href="https://twitter.com/real_cr21/status/1689763903268392960?ref_src=twsrc%5Etfw"></a></blockquote>`
]

tweets.forEach(t =>{
	document.querySelector('.contentHolder').innerHTML += t;
})