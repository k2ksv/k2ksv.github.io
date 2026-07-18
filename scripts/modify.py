import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Extract the .links-horizontal block
links_match = re.search(r'(\s*<div class="links-horizontal">.*?</div>\n)', content, flags=re.DOTALL)
links_content = links_match.group(1)

# 2. Remove the entire <section id="profiles">...</section>
content = re.sub(r'\s*<section id="profiles">.*?</section>\n', '\n', content, flags=re.DOTALL)

# 3. Replace the <nav> and insert the links above the <h1>
# Find the header block
header_pattern = r'(\s*<header>\n)(\s*<h1>.*?</h1>\n)(\s*<nav>.*?</nav>\n)'
header_match = re.search(header_pattern, content, flags=re.DOTALL)

new_header = header_match.group(1) + links_content + header_match.group(2)
content = content.replace(header_match.group(0), new_header)

with open('index.html', 'w') as f:
    f.write(content)
