// Main working variables START:
const url: string = "https://api.github.com/users/"+Deno.args[0];
var resp = await fetch(url);
var json = (await resp.json());
// END

// Example functions
export function example_func()
{
    // CODE GOES HERE
}

// Utilities START:

export function help() {
    console.log("Welcome to gh.ts!");
    console.log("Syntax:");
    console.log("deno run --allow-net gh.ts <USERNAME> -<OPTIONS_GO_HERE>");
    console.log("The Options:");
    console.log("-a: Shows misc info");
    console.log("-r: Lists repo");
    console.log("-s: Starred repos");
    console.log("-f: Iollowers");
    console.log("-i: Basic info");
    console.log("-S: Save the avatar of the user (NOTE: this requires the \"--allow-write flag\")");
    console.log("");
    console.log("For example:");
    console.log("deno run --allow-net gh.ts anuraghazra -i");
    console.log("This runs the command with the info option enabled");
    console.log("");
    console.log("deno run --allow-net gh.ts anuraghazra -S");
    console.log("This saves @anuraghazra's avatar");
}

export function misc() {
    const company = json["company"];
    const blog = json["blog"];
    const twitter = json["twitter"];
    const hireable = json["hireable"];
    const email = json["email"];
    const location = json["location"];
    
    if (company) {
        console.log(json["name"],"works at",company);
    }
    if (blog) {
        console.log(json["name"],"\b's blog is at",blog);
    }
    if (twitter) {
        console.log(json["name"],"\b's twitter: ",twitter);
    }
    if (hireable) {
        console.log(json["name"],"is hireable!");
    }
    if (email) {
        console.log(json["name"],"'\b's email: ",email);
    }
    if (location) {
        console.log(json["name"],"is located at/in",location);
    }
}

export function info() {
    console.log(`${json["name"]} a.k.a ${json["login"]}`);
    console.log("Bio:",json["bio"]);
}

export async function repos() {
    var resp = await fetch(url+"/repos");
    
    console.log("Repos: ");
    for (var repo of (await resp.json())) {
        console.log(repo["full_name"]);
    }
    console.log("");
}

export async function stars() {
    var resp = await fetch(url+"/starred");
    
    console.log("Starred repos: ");
    for (var star of (await resp.json())) {
        console.log(star["full_name"]);
    }
    console.log("");
}

export async function followers() {
    var resp = await fetch(url+"/followers");

    console.log("Followers: ");
    for (var fllers of (await resp.json())) {
        console.log(fllers["login"]);
    }
    console.log("");
}

export async function save_avatar() {
    var gh_username = json["login"]; // Name should be provided as the command line agruments
    const resp = await fetch(`https://api.github.com/users/${gh_username}`); // Get the response
    var json_resp = await (resp).json(); // Get the JSON

    const avatar_url = json_resp["avatar_url"]; // The avatar is present on this link
    const avatar_data = await fetch(avatar_url); // Fetch it from the URL
    const data_blob = await (avatar_data).blob(); // Get the blob from data
    const image_data = await(data_blob).stream().getReader().read(); // Read the data from the stream's blob
    const value = image_data.value; // The actual value to be written to the file
    Deno.writeFileSync(`${gh_username}.png`, value); // Writing it!!
}
// END