var Vue = require('./lib/vue.js');
var SaverFile = require('./saver');
var Saver = SaverFile();
var game = new Vue({
    el: '#gameArea',
    data: {
        size: 2,
        maxSize: 10,
        sizes : [2,3,4,5,6,7,8,9,10],
        instr: false,
        winnerName: "",
        difficulty : "Normal",
        objectArray: [{
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            firstName: 'Amily',
            lastName: 'Brown'
        },
        {
            firstName: 'Jack',
            lastName: 'London'
        },
        ],
        shapes: [
            { name: "circle", img: "./assets/circle.png" },
            { name: "square", img: "./assets/square.png" },
            { name: "triangle", img: "./assets/triangle.png" },
            { name: "kite", img: "./assets/kite.png" },
        ],
        s_len: [0, 1, 2, 3],
        current_: 0,
        some_counter: 0,
        player_info: {
            player_bids: [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            player_money: [-1, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            items_collected: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        },
        round: 0,
        current_player: 0,
        first_player: -1,
        border_style: "border-width: 5px;border-color:#E4D00A;border-radius: 0;border-style: solid;",
        shake_: false,
        r: 0,
        c: 0,
        r_: 0,
        item_sold: false,
    },

    watch :{
        size: function (newSize) {
            this.size = parseInt(newSize);
        }
    },

    methods: {
        highlight: function (event) {
            for (var i = 0; i < event.target.parentElement.children.length; i++) {
                event.target.parentElement.children[i].classList.remove('bg-warning');
            }
            event.target.classList.add('bg-warning');
        },

        //Game logic
        startGame: function () {
            this.resetGrid();

            this.$refs.shapes_div.children[this.current_].children[0].children[0].style = this.border_style;
            this.first_player = 0;
            this.current_player = this.first_player;

            this.$refs.players_div.children[this.first_player].style = "display: table-cell;" + this.border_style;
            this.$refs.players_div.children[this.first_player].children[0].children[0].removeAttribute('disabled');
            this.$refs.players_div.children[this.first_player].children[0].children[0].focus();
        },

        getWinner: function () {
            if(this.mode == "PvP") {
                if (this.scoreOne > this.scoreTwo) {
                    return "Player One";
                } else if (this.scoreOne == this.scoreTwo) {
                    return "Player One && Player Two";
                } else {
                    return "Player Two";
                }
            } else {
                return "You";
            }
        },

        showInstr: function(){
            return this.instr;
        },

        changeInstr: function () {
            this.instr = !this.instr;
        },

        nextRound: function () {
            current = this.current_;

            this.$refs.shapes_div.children[current].children[this.c].children[this.r].style = "";

            if (this.item_sold) {
                this.$refs.shapes_div.children[current].children[this.c].children[this.r].children[0].setAttribute('src', '');
            }

            this.round++;
            
            if (this.s_len.length == 0){
                this.s_len = [0, 1, 2, 3];

                this.r_++;
                this.r = Math.floor(this.r_ / this.size);
                this.c = (this.c + 1) % this.size;
            }

            index = Math.floor(Math.random() * this.s_len.length)
            next = this.s_len[index];
            this.s_len[index] = this.s_len[this.s_len.length - 1];
            this.s_len.pop();

            this.current_ = next;

            console.info(this.s_len);
            console.log(this.r + ", " + this.c + " and current: " + this.current_);

            this.$refs.shapes_div.children[next].children[this.c].children[this.r].style = this.border_style;

            this.first_player = this.round % this.size;
            this.current_player = this.first_player;

            this.$refs.players_div.children[this.first_player].style = "display: table-cell;" + this.border_style;
        },

        calculateWinner: function() {
            winner = -1;
            max_bid = -1;

            for(i = this.first_player; i <= this.size; i++){
                if (this.player_info.player_bids[i] > max_bid && this.player_info.player_money[i] >= this.player_info.player_bids[i]){
                    max_bid = this.player_info.player_bids[i];
                    winner = i;
                }
            }

            for (i = 1; i < this.first_player; i++){
                if (this.player_info.player_bids[i] > max_bid && this.player_info.player_money[i] >= this.player_info.player_bids[i]) {
                    max_bid = this.player_info.player_bids[i];
                    winner = i;
                }
            }

            return winner;
        },

        resetGrid: function() {
            for(i = 0; i < this.size; i++){
                this.$refs.players_div.children[i].style = "display: table-cell;";
                this.$refs.players_div.children[i].children[0].children[0].setAttribute('disabled', '');
                this.$refs.players_div.children[i].children[0].children[0].blur();
                for(j = 0; j < 8; j++){
                    this.$refs.players_div.children[i].children[0].children[6].children[j].setAttribute('hidden', '');
                }

                Vue.set(this.player_info.player_money, i + 1, 100);
                Vue.set(this.player_info.player_bids, i + 1, 0);
                this.player_info.items_collected[i] = [0, 0, 0, 0];

            }

            for(i = 0; i < 4; i++){
                for(j=0; j < this.size; j++){
                    for(k = 0; k < 3; k++){
                        this.$refs.shapes_div.children[i].children[this.c].children[this.r].style = "";
                        this.$refs.shapes_div.children[i].children[this.c].children[this.r].children[0].setAttribute('src', this.shapes[i].img);
                    }
                }
            }

            this.s_len = [0, 1, 2, 3];
            
            index = Math.floor(Math.random() * this.s_len.length)
            this.current_ = this.s_len[index];
            this.s_len[index] = this.s_len[this.s_len.length - 1];
            this.s_len.pop();

            this.first_player = 0;

            console.info(this.s_len);
            console.log(this.r + ", " + this.c + " and current: " + this.current_);
        },

        nextPlayer: function () {
            this.$refs.players_div.children[this.current_player].style = "display: table-cell";
            this.current_player = (this.current_player + 1) % this.size;

            if(this.current_player == this.first_player){
                this.current_player = this.first_player;
                current_item = this.current_;
                winner = this.calculateWinner();

                if(winner != -1){
                    this.item_sold = true;
                    newValue = this.player_info.player_money[winner] - this.player_info.player_bids[winner];
                    Vue.set(this.player_info.player_money, winner, newValue);

                    this.player_info.items_collected[winner][current_item]++;

                    if (this.player_info.items_collected[winner][current_item] == 3) {
                        alert("Game over! The winner is player " + winner);
                        Saver.saveScore("player" + winner, 'WIN');
                        this.resetGrid();
                    }
                    else {
                        img_to_show = (this.player_info.items_collected[winner][current_item] - 1) * 4 + current_item;

                        this.$refs.players_div.children[winner - 1].children[0].children[6].children[img_to_show].removeAttribute('hidden');

                        this.shake_ = true;
                        setTimeout(() => {
                            this.shake_ = false
                        }, 2500);
                    }
                }
                else{
                    this.item_sold = false;
                }

                this.nextRound();
            }
            else{
                // Highlight new player
                this.$refs.players_div.children[this.current_player].style = "display: table-cell;" + this.border_style;
            }
        },

        makeBid: function (event) {
            this.nextPlayer();
            event.target.blur();
            event.target.setAttribute('disabled', '');

            this.$refs.players_div.children[this.current_player].children[0].children[0].removeAttribute('disabled');
            this.$refs.players_div.children[this.current_player].children[0].children[0].focus();
        },

        edgeClick: function (edge) {
            if (this.gameStatus == "tunnel building" || this.gameStatus == "tunnel guess") {
                if (this.gameStatus == "tunnel building") {
                    Tunnel.selectEdge(edge);
                } else if (this.gameStatus == "tunnel guess") {
                    Tunnel.finalSelectEdge(edge);
                }
            } else if (this.gameStatus == "node/edge detection") {
            }
        },

        //After each round of guess, we need to reveal the result of guesses.
        finishGuess: function () {
            if (this.gameRound == 1) {
                this.scoreOne = Tunnel.finalGuess();
                if (this.scoreOne == -1) {
                    this.scoreOne = 10000;
                }
                alert("PlayerTwo as detector:" + this.scoreOne);
                this.gameStatus = "Between two game";
            } else {
                this.scoreTwo = Tunnel.finalGuess();
                if (this.scoreTwo == -1) {
                    this.scoreTwo = 10000;
                }
                if (this.mode == "PvP") {
                    alert("PlayerTwo as detector:" + this.scoreOne + ". PlayerOne as detector:" + this.scoreTwo);
                } else {
                    alert("Your score:" + this.scoreTwo);
                }
                this.endGame();
            }
        },

        //Node can be clicked only when it is guessing.
        nodeClick: function (node) {
            if (this.gameStatus == "node/edge detection" && this.gameRound < 4) {
                
            }
        },

        finishPrepare: function () {
            
            this.guessRound++;

            var result = Tunnel.guessResult(this.difficulty == "Easy");
            var goodNodes = result.goodNodes;
            var goodEdges = result.goodEdges;
            var badNodes = result.badNodes;
            var badEdges = result.badEdges;

            for (var i = 0; i < goodEdges.length; i++) {
                
            }
            for (var i = 0; i < goodNodes.length; i++) {
                
            }
            for (var i = 0; i < badEdges.length; i++) {
                
            }
            for (var i = 0; i < badNodes.length; i++) {
                
            }

            if (this.guessRound > 3) {
                this.gameStatus = "tunnel guess";
                alert("choose your final guess!");
                
            }
        },

        maxEdge: function () {
            return Tunnel.getSize();
        },

        getWinner: function () {
            if (this.mode == "PvP") {
                if (this.scoreOne > this.scoreTwo) {
                    return "Player One";
                } else if (this.scoreOne == this.scoreTwo) {
                    return "Player One && Player Two";
                } else {
                    return "Player Two";
                }
            } else {
                return "You";
            }
        },

        endGame: function () {
            this.gameRound = 1;
            this.guessRound = 1;
            this.gameStatus = "game end";
            
        },

        clearBoard: function () {
            
        },

        gotoBegin: function () {
            
            this.gameStatus = "mode selection";

        },

        gotoDetect: function () {
            
        },

        isValid: function () {
            return Tunnel.isValid(this.size);
        },

        edgeLeft: function () {
            return Tunnel.edgeLeft();
        },

        revealBoard: function () {
            
        },

        startSameGame: function () {
            
        },

        startNextRound: function () {
            
        },

        //Show/Hide logic for html element
        showBetweenGameInfo: function () {
            return this.gameStatus == "Between two game";
        },

        showSaveButton: function () {
            return (this.scoreOne > 0 || this.scoreTwo > 0) && this.gameStatus == "game end";
        },

        showEdgeInfo: function () {
            return this.gameStatus == "tunnel building";
        },

        showGuessInfo: function () {
            return this.gameStatus == "node/edge detection";
        },

        showModeSelect: function () {
            return this.gameStatus == "mode selection";
        },

        showFinishGuessInfo: function () {
            return this.gameStatus == "tunnel guess";
        },

        showInstr: function () {
            return this.instr;
        },

        showBasicInfoPvP: function () {
            return this.mode == "PvP";
        },

        showBasicInfoAI: function () {
            return this.mode == "AI";
        },

        changeInstr: function () {
            this.instr = !this.instr;
        },
    }
});