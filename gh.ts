import * as routines from "./routines.ts";
if (Deno.args.length == 0) {
    console.log('See possible options: deno run --allow-net gh.ts -h')
}

if (Deno.args[1]) {
    if (Deno.args[1] == "-h") {
        routines.help();
    }
    var opts: string = Deno.args[1];
    if (!opts.startsWith("-")) {
        console.log("Option invalid!");
        throw Error("Invalid Option")
    }

    opts = opts.slice(1,opts.length);
    
    var oparr: string[] = opts.split("");
        
    for (let op of oparr)
    {
        switch (op)
        {
            case "i":
                routines.info();
            break;
            case "r":
                await routines.repos();
            break;
            case "s":
                await routines.stars();
            break;
            case "f":
                await routines.followers();
            break;
            case "a":
                routines.misc();
            break;
        }
    }
}





/*
info();
await repos();
await stars();
await followers();
*/

