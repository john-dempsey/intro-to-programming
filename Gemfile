# Only needed to preview the site on your own computer.
# GitHub Pages ignores this file and builds the site itself.
#
# We use plain Jekyll 4 here rather than the "github-pages" gem, because
# github-pages does not install on Ruby 4. The theme and settings come from
# _config.yml either way, so the preview looks the same as the live site.
source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-remote-theme"
  gem "jekyll-seo-tag"
  gem "jekyll-include-cache"
  gem "jekyll-redirect-from"
end

# Libraries that newer versions of Ruby no longer include by default.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "webrick"

# Windows only: time zone data and faster file watching.
platforms :windows do
  gem "tzinfo-data"
  gem "wdm"
end
