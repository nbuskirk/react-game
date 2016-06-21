var Game = React.createClass({
	render: function() {
		return <Level />
	}
})
var Level = React.createClass({

	drawTiles: function() {
		var tiles = [
			{ name: "sky", hex: "blue", posX: 0, posY:0 },
			{ name: "sky", hex: "blue", posX: 50, posY: 0 },
			{ name: "sky", hex: "blue", posX: 100, posY:0 },
			{ name: "sky", hex: "blue", posX: 150, posY: 0 },
			{ name: "sky", hex: "blue", posX: 200, posY:0 },
			{ name: "ground", hex: "green", posX: 0, posY: 50 },
			{ name: "ground", hex: "green", posX: 50, posY: 50 },
			{ name: "ground", hex: "green", posX: 100, posY: 50 },
			{ name: "ground", hex: "green", posX: 150, posY: 50 },
			{ name: "ground", hex: "green", posX: 200, posY: 50 },
			{ name: "ground", hex: "green", posX: 0, posY: 100 },
			{ name: "ground", hex: "green", posX: 50, posY: 100 },
			{ name: "ground", hex: "green", posX: 100, posY: 100 },
			{ name: "ground", hex: "green", posX: 150, posY: 100 },
			{ name: "ground", hex: "green", posX: 200, posY: 100 },
			{ name: "player", hex: "red", posX: 100, posY: 50 }
		];	
		return tiles.map(function(tile,i){
			return <GameTile key={i} name={tile.name} color={tile.hex} posX={tile.posX} posY={tile.posY}/>
		})
	},
	render: function() {
			return ( 
				<div>
					{ this.drawTiles() }
				</div> 
			)
	}
})
var GameTile = React.createClass({
	componentDidMount: function() {
		$(document.body).on('keydown',this.handleKeyDown);
	},
	componentWillUnmount: function() {
    	$(document.body).off('keydown', this.handleKeyDown);
    },
	handleKeyDown: function(e){
		console.log(e.keyCode)
		if(this.state.isPlayer){
			var position = {'x':this.state.posX,'y':this.state.posY};
			
			switch(e.keyCode){
				case 39:
					/*right*/
					position.x = this.state.posX+50;
					break;
				case 38:
					/* up*/
					position.y = this.state.posY-50
					break;
				case 40:
					/*down*/
					position.y = this.state.posY+50
					break;
				case 37:
					/*left*/
					position.x = this.state.posX-50
					break;
			}
			
			this.setState({
				posX: position.x,
				posY: position.y
			},function(){
				console.log(this.state)
			})
		}
	},
	getInitialState: function() {
		return {
			isPlayer: this.props.name == "player" || false,
			posY: this.props.posY,
			posX: this.props.posX
		}
	},
	render: function() {
		var style = {
			top: this.state.posY,
			left: this.state.posX,
			backgroundColor: this.props.color
		}

		return <div className="gameTile" style={style}></div>
	}
})
ReactDOM.render(<Game />,document.getElementById('content'));