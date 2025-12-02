# MinIndie

This theme is **heavily** based on [smol](https://themes.gohugo.io/themes/smol/), a minimalist hugo theme, thanks to their work!

MinIndie is a very minimal hugo theme with indieweb markups. A demo can be found on my blog at https://bacardi55.io

## Features

- No JavaScript
- No Google spyware or tracking of any kind
- No other external dependencies, embedded fonts or comment sections
- Dark mode support (depending on your OS's setting)
- Indieweb markup

## Installation

In your Hugo site `themes` directory, run:

```
git clone https://
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `smol`.

```
theme = "minindie"
```

Lastly, add the following lines to your `config.toml` to set site parameters and make use of all the menu entries in the header and footer sections if you need them.

```
title = "Site Name"
baseURL = "https://your.domain.tld"
copyright = "A copyright message"

# Parameters
[params]
  subtitle = "ἕν οἶδα ὅτι οὐδὲν οἶδα"
  dateFmt = "Monday, January 2, 2006"
  # tagPostOlderThanXDays = 555 # To display a message if the post is older than this number of days.
  # xslpath = "/rss.xsl" # If you want to theme your RSS feed. Optional.

[params.author]
  name = "your name" # required for h-card
  email = "your@email.tld"
  avatar = "/path/to/avatar.png"
  bio = "A bio description<br />Html is accepted."

[params.indieweb]
  authorizationEndpoint = "https://indieauth.com/auth"
  tokenEndpoint = "https://tokens.indieauth.com/token"
  webmentionEndpoint = "https://webmention.io/your.domain.tld/webmention"
  relmepgp = "/path/to//public/key.asc"
  [[params.indieweb.relme]]
      url = "https://"
  [[params.indieweb.relme]]
      url = "https://"

# Menus:
## Header
[menu]
  [[menu.main]]
        identifier = "posts"
        name = "Posts"
        url = "/posts/"
        weight = 1

  [[menu.main]]
        identifier = "categories"
        name = "Categories"
        url = "/categories/"
        weight = 2

  [[menu.main]]
        identifier = "tags"
        name = "Tags"
        url = "/tags/"
        weight = 3

## Footer
  [[menu.footer]]
        name = "Github"
        url = "https://github.com/example"
        weight = 1

    [[menu.footer]]
        name = "Mastodon"
        url = "https://example.com/@user"
        weight = 2

    [[menu.footer]]
        name = "Imprint"
        url = "/imprint"
        weight = 3

```

## License

This theme is released under the [MIT license](https://github.com/colorchestra/smol/blob/master/LICENSE).
