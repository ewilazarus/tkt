# `ubt`

A programmer's utility belt.

## Features

- Encode/decode Base64 strings
- Pretty print/minify JSON payloads
- Diff two files

## Usage

```
Usage: ubt [options] [command]

A programmer's utility belt

Options:
  -v, --version        output the current version
  -h, --help           display help for command

Commands:
  b64 [options]        Encodes or decodes a string using Base64. The string is read from stdin.
  json [options]       Minifies or prettifies a JSON string read from stdin.
  diff <left> <right>  Compares two files and outputs the differences.
  help [command]       display help for command
```

## Disclaimer

This has been created and tested on macOS Ventura 13.4, only. It might work on Linux as well, but it certainly won't on Windows (unless you're using something like WSL).

Feel free to open a PR to add support for different platforms.

## Read more

- [Blog post](https://ewilazarus.github.io/posts/cli-utility-belt/)
