import os

def generate_tree(dir_path, indent=""):
    """
    Recursively generate the tree structure for a given directory.
    
    For directories:
      - If a directory's name is "__pycache__", it is completely ignored.
      - If a directory's name is one of ("node_modules", "venv", "developement", ".git", ".got"),
        only the folder name is printed (without listing its contents).
      - All other directories are processed recursively.
      
    Files are always listed.
    """
    lines = []
    folder_name = os.path.basename(os.path.abspath(dir_path))
    if not folder_name:
        folder_name = dir_path
    lines.append(indent + folder_name)

    try:
        items = sorted(os.listdir(dir_path))
    except PermissionError:
        return lines

    for item in items:
        item_path = os.path.join(dir_path, item)
        if os.path.isdir(item_path):
            if item == "__pycache__":
                # Completely ignore __pycache__ directories.
                continue
            # For these directories, only show the folder name.
            if item in ("node_modules", "venv", "developement", ".git", ".got"):
                lines.append(indent + "    " + item)
                continue
            # Otherwise, recursively process the directory.
            lines.extend(generate_tree(item_path, indent + "    "))
        else:
            lines.append(indent + "    " + item)
    return lines

if __name__ == "__main__":
    # Determine the directory where this script is located.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Set the root directory to be the parent of the script's directory.
    root_dir = os.path.abspath(os.path.join(script_dir, ".."))
    
    # Generate the tree structure starting from the root directory.
    tree_lines = generate_tree(root_dir)
    
    # Save the output in the same directory where the script is run.
    output_path = os.path.join(script_dir, "tree.txt")
    with open(output_path, "w", encoding="utf-8") as file:
        file.write("\n".join(tree_lines))
    
    print(f"Tree structure has been saved to {output_path}")
