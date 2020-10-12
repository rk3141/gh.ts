# gh.ts

An command utility to view GitHub Profiles made with the Deno runtime.

(I know the output is ugly, please fix it by making a PR!)

## Contributing

Make sure you have deno installed ([Install Deno here](https://deno.land/#installation))

Then simply run the program:
```sh
$ deno run --allow-net gh.ts anuraghazra -i
```

### Adding a new property:
Add a charecter code for the option you are implementing to [`gh.ts` Line No. 22](https://github.com/rishit-khandelwal/gh.ts/blob/master/gh.ts#L22)
and then add the function to execute to the `case` and implement it in `routines.ts` [like this example function](https://github.com/rishit-khandelwal/gh.ts/blob/master/gh.ts#L7)