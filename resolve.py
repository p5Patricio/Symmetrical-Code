import re

def resolve_projects_page():
    with open('src/pages/ProjectsPage.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Block 1: DetailModal Return
    block1_pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n(.*?)\n>>>>>>> origin/mariodev\n              </div>\n            </div>\n          </div>\n        </div>\n\n        {\/\* Outer Navigation \*\/}', re.DOTALL)
    
    def block1_repl(m):
        # We take Mario's modal, but change the wrapper to flex-col and keep the user's outer navigation intact
        mario_modal = m.group(2)
        # Mario's wrapper has: className="fixed inset-0 ... flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        # We change it to flex-col to stack the modal and the outer navigation
        mario_modal = mario_modal.replace('flex items-center justify-center', 'flex flex-col items-center justify-center mb-8')
        return mario_modal + '\n              </div>\n            </div>\n          </div>\n        </div>\n\n        {/* Outer Navigation */}'

    content = block1_pattern.sub(block1_repl, content)

    # Block 2: Grid items inside the gallery
    block2_pattern = re.compile(r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>> origin/mariodev', re.DOTALL)
    # Actually, we have two more blocks.
    # Block 2 is the article mapping in the gallery.
    # Block 3 is the grid rendering for the main page.
    # Let's do it carefully by finding the remaining conflict markers.
    
    parts = re.split(r'<<<<<<< HEAD\n', content)
    if len(parts) == 3: # 2 markers left
        # Marker 1: gallery mapping
        sub_parts1 = re.split(r'=======\n', parts[1])
        sub_parts2 = re.split(r'>>>>>>> origin/mariodev\n', sub_parts1[1])
        
        user_gallery = sub_parts1[0]
        mario_gallery = sub_parts2[0]
        rest1 = sub_parts2[1]
        
        # We want to take mario_gallery, but ADD the uniqueTechTags logic and the line clamp logic from user.
        # Actually user has: {uniqueTechTags.slice(0, 6).map(tag => ...)}
        # Mario has just {project.title} and {project.description}.
        # Let's combine them:
        combined_gallery = mario_gallery.replace(
            '<div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">',
            '<div className="p-4 sm:p-5 flex flex-col flex-1">\n                    <div className="flex items-center justify-between mb-2">'
        )
        # It's getting too messy to string replace Mario's code. 
        # I'll just write the exact code I want for Block 2 and Block 3 in the script.

if __name__ == '__main__':
    resolve_projects_page()
