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
		"callback": function(argv) {
			logText("Listing all commands...")
			for (let i in commands) {
				const command = commands[i];
				let str =
				`"${command.name}" - ${command.description || "No description"}` +
				`\n\tAliases: ${command.aliases && command.aliases.join(", ") || "None"}`;
				logText(str);
			}
		}
	},
	{
		"name": "help",
		"description": "Fetches information about a specific command.",
		"usage": "help [commandname]",
		"callback": function(argv) {
			if (argv < 1) {
				logText("Lacking arguments!\nUsage: help [command]");
				return;
			} else {
				const command = getCommand(argv[0]);
				if (command) {
					let str =
					`"${command.name}" - ${command.description || "No description"}` +
					`\n\tAliases: ${command.aliases && command.aliases.join(", ") || "None"}`;
					if (command.usage) {
						str += `\n\tUsage: ${command.usage}`;
					}
					logText(str);
				} else {
					logText(`Could not fetch information on unknown command "${argv[0]}"`);
				}
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
		return tbl.name == cmd || (tbl.aliases && tbl.aliases.includes(cmd));
	})
}
function handleInput(text) {
	const argv = text.split(" ");
	const command = getCommand(argv[0]);
	if (command) {
		command.callback(argv.slice(1));
	} else {
		logText(`Unknown command "${argv[0]}"`)
	}
}

function logText(text, style) {
	const elm = document.createElement("pre");
	elm.innerText = text;
	elm.style = style;
	log.appendChild(elm);
}
function clear() {
	log.innerHTML = "";
}

document.addEventListener("keydown", function(event) {
	console.log(event.code);
	switch (event.code) {
		case "Enter":
			if (input.length > 0) {
				logText(input);
				handleInput(input);
				input = "";
			} else {
				logText("\n");
			}

			break;
		case "Backspace":
			input = input.substring(0, input.length - 1);

			break;
		case "Space":
			input += " ";

			break;
		default:
			if (event.key.length <= 1) {
				input += event.key;
			}

			break;
	}
	current.innerText = input;
})