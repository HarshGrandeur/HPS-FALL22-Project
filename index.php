<?php
// Filename of your index page
$index = "iframe.html";
$game = "Auction Triplets 2";
$team = "Team Pratham";
$instruction = <<<EOD
<strong>Auction Triplets</strong>
<p> Auction Triplets is a multi-player auction game. There can be 2-8 players that can play the game. Each player satrts with a fixed initial amount of money (100). There are 4 total object types for the auction. The objective of the game is to collect 3 objects of the same type. The first player to do so wins the game.</p>
            To play the game:<br>
                <ul>
                    <li>Choose the number of players from the dropdown and click start.</li>
                    <li>The object up for auction gets highlighted and so does the player whose turn it is (the player who goes first is determined randomly).</li>
                    <li>The player would place their bid and press `Enter`</li>
                    <li>Then the next player bids, and the next and so on. Once all players have made their bids, the player with the highest (valid) bid wins</li>
                    <li>The game ends when a player wins (obtains 3 objects of the same type) </li>
                    <li>`Reset Game` can be used to reset the game</li>
                </ul> 
EOD;

// Size of the popup window
$width = 940;
$height = 1000;
$scoring = -1;

include '../../template.php';