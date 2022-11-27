<?php
// Filename of your index page
$index = "iframe.html";
// Metadata
$game = "Auction Triplets";
$team = "Team Pratham";
$instruction = <<<EOD
<strong>Overview:</strong> <br/>
<p> Dig That is a two-player game between a Badguy and a Detector.
    The Badguy builds an explosive tunnel under the city and it is the role of the Detector to detect the tunnel.
    Two people can play, or one person can play Detector and the computer will be the Badguy.</p>
<strong>Phases:</strong> <br/>
<ol>
    <li> The Detector looks away from the screen while the Badguy builds a tunnel.
        Maximum length of the tunnel is randomly generated,
        and will be specified before building begins.
        The tunnel needs to be a simple path with a start and end node on the top and bottom rows respectively.
        In order to construct the tunnel, the Badguy needs to click on the edges he wants to be a part of his tunnel.
        When he is content with the tunnel, he clicks on the "I finished my tunnel" button in the info panel and the tunnel will disappear. </li>
    <li> Now the Detector can begin detecting by placing probes on any number of intersections or edges. When the Detector is done,
        click the "Done placing first round of probes" button.
        If a given probe is on top of a part of the tunnel,
        the probe will turn green. Repeat this process up to two more times. </li>
    <li> The Detector selects what she believes is the location of the tunnel.
        When she is done, she clicks on the "Ready to submit final guess" button. </li>
</ol>
<p>If the Detector correctly detected the tunnel, her score is (intersection probes + edge probes) she used. If she incorrectly detected the tunnel, then she gets a score of infinity. Now the two players reverse roles. The winner is the player with the lowest score. </p>
EOD;

// Size of the popup window
$width = 940;
$height = 1000;
// If your score is sortable, 1 if higher score is better, -1 if smaller score is better, 0 otherwise.
$scoring = -1;

include '../../template.php';