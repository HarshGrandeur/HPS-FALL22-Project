<?php
// Filename of your index page
$index = "iframe.html";
$game = "Auction_Triplets_2";
$team = "Team Pratham";
$instruction = <<<EOD
<h1><strong>Auction Triplets</strong></h1>
<p> Auction Triplets is a multi-player auction game. There can be 2-8 players that can play the game. <br><br>
<strong>How the game starts:</strong><br>
The game starts as follows: Each player starts with a fixed initial amount of money (100).<br><br>
<strong>Objects:</strong><br>
There are <strong>4 total object types</strong> for the auction.<br><br> 
<strong>Objective:</strong><br>The objective of the game is to collect <strong>3 objects of the same type</strong>. The first player to do so wins the game.</p><br>
            <strong>To play the game:</strong><br>
                <ul>
                    <li>Choose the number of players from the dropdown and click start.</li>
                    <li>The object up for auction gets highlighted and so does the player whose turn it is (the player who goes first is determined randomly).</li>
                    <li>The player <strong>places their bid</strong> and presses `Enter`</li>
                    <li>If the bid is invalid, then the game would throw an error and ask the player to enter a valid bid amount</li>
                    <li>Then the next player bids, and the next and so on. Once all players have made their bids, the player with the highest (valid) bid wins</li>
                    <li>The game ends when a player wins (obtains 3 objects of the same type) </li>
                    <li>`Reset Game` can be used to reset the game</li>
                    <li>In case of a tie, the first player that made the winning bid wins. Since each player gets to go first, this method to resolve ties is simple and fair</li>
                </ul> 
EOD;

// Size of the popup window
$width = 940;
$height = 1000;
$scoring = -1;

include '../../template.php';