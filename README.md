# s3scanner

> Scan for open public S3 buckets

## Install

```bash
npm i -g s3scanner
```

## Getting started

`sites.txt`

```text
flaws.cloud
http://flaws.cloud/
reddit.com
stackoverflow.com
```

```bash
$ s3scanner sites.txt

flaws.cloud
2017-03-13 20:00:38       2575 hint1.html
2017-03-02 20:05:17       1707 hint2.html
2017-03-02 20:05:11       1101 hint3.html
2018-07-10 09:47:16       3082 index.html
2018-07-10 09:47:16      15979 logo.png
2017-02-26 17:59:28         46 robots.txt
2017-02-26 17:59:30       1051 secret-dd02c7c.html

not public: reddit.com
not public: stackoverflow.com
```

## License

[MIT](LICENSE)
