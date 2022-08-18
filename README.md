# sosolocal

Easy SSL proxy for local dev environments

### Usage

```
❯ sslocal -h
Usage: sosolocal [options]

SSL proxy for local dev environments

Options:
  -v, --version          output the version number
  -s, --source <port>    port to access service via https
  -t, --target <port>    port of http service
  -c, --cert <file>      path/to/your-ssl-cert.pem
  -k, --key <file>       path/to/your-ssl-key.pem
  -n, --host <hostname>  set the hostname (default: "localhost")
  -h, --help             display help for command

```

### Example

Serve https on port 4000 for your app running on port 3000.

```bash
❯ sslocal -s 4000 -t 3000
✅ Proxying https://localhost:4000 → http://localhost:3000
```

### Note

If you are using Google Chrome, you may [need to type](https://stackoverflow.com/questions/58802767/no-proceed-anyway-option-on-neterr-cert-invalid-in-chrome-on-macos/58957322#58957322) `thisisunsafe` to bypass the invalid certificate warning.
