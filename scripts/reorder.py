import re

with open('index.html', 'r') as f:
    content = f.read()

# Find the three projects using their starting patterns and end patterns
quantlab_start = content.find('<div class="project-item">', content.find('QuantLab'))
quantlab_start = content.rfind('<div class="project-item">', 0, quantlab_start)
codeforces_start = content.find('<div class="project-item">', content.find('Codeforces Daily Momentum'))
codeforces_start = content.rfind('<div class="project-item">', 0, codeforces_start)
kos_start = content.find('<div class="project-item">', content.find('KOS — Distributed AI Inference Platform'))
kos_start = content.rfind('<div class="project-item">', 0, kos_start)
end_of_kos = content.find('</section>', kos_start)

kos_block = content[kos_start:end_of_kos]
rest_of_projects = content[quantlab_start:kos_start]

# Assemble the new content
new_content = content[:quantlab_start] + kos_block + rest_of_projects + content[end_of_kos:]

with open('index.html', 'w') as f:
    f.write(new_content)

print("Reordered successfully.")
