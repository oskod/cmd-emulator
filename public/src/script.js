let input = ""

/*
example command
{
	"name": "example",
	"aliases": ["exmp", "ex"], // not required
	"description": "Lorem ipsum", // not required
	"callback": function(argv) {
		console.log(argv);
	}
}
*/
const commands = [
	{
		"name": "cmds",
		"description": "Lists all available commands.",
		"usage": "cmds ",
		"callback": function(argv) {
			for (let i in commands) {
				const command = commands[i]
				logText(`${command.name}: `)
			}
		}
	},
	{
		"name": "help",
		"description": "Fetches information about a specific command.",
		"callback": function(argv) {
			if (argv < 1) {
				logText("Lacking arguments!\nUsage: help [command]");
				return;
			}

			
		}
	},
	{
		"name": "clear",
		"description": "Clears the current output.",
		"aliases": ["cls", "clr"],
		"callback": function(argv) {
			clear();
		}
	}
]
function getCommand(cmd) {
	return commands.find(function(tbl) {
		return tbl.name == cmd || (tbl.includes("aliases") && tbl.aliases.includes(cmd));
	})
}
function handleInput(text) {
	const argv = text.split(" ");
	const command = getCommand(argv[0])
	if (command) {
		command.callback(argv.slice(1))
	} else {
		logText(`Unknown command "${argv[0]}"`)
	}
}

function logText(text) {
	const elm = document.createElement("p");
	elm.innerText = text;
	log.appendChild(elm);
}
function clear() {
	log.innerHTML = "";
}

document.addEventListener("keypress", function(event) {
	console.log(event.code);
	switch (event.code) {
		case "Enter":
			if (input.length > 0) {
				logText(input);
				handleInput(input);
				input = "";
			} else {
				logText("\n")
			}

			break;
		case "Space":
			input += " ";

			break;
		default:
			input += event.key;

			break;
	}
	current.innerText = input
})