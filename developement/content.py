import os

def is_valid_file(filename):
    """
    Return True if the file has one of the allowed extensions and is not 'package-lock.json'.
    """
    valid_extensions = ('.env', '.py', '.jsx', '.js', '.json', '.html', '.txt')
    if filename == "package-lock.json":
        return False
    return filename.lower().endswith(valid_extensions)

def gather_files(root_dir, start_dir):
    """
    Walk through the directory tree starting at root_dir, gathering the content of valid files.
    Skips directories: node_modules, venv, developement, and any folder named __pycache__.
    
    For each file, compute its relative directory path from start_dir:
      - If the relative path is ".", it is recorded as "."
      - Otherwise, it is recorded as "./<relative_path>"
    """
    entries = []
    for current_root, dirs, files in os.walk(root_dir):
        # Exclude unwanted directories from the traversal.
        dirs[:] = [d for d in dirs if d not in ("node_modules", "venv", "developement", "__pycache__")]
        for file in files:
            if is_valid_file(file):
                file_path = os.path.join(current_root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    content = f"Error reading file: {e}"
                # Compute the relative directory path from start_dir.
                rel_dir = os.path.relpath(current_root, start_dir)
                directory_path = "." if rel_dir == "." else "./" + rel_dir
                entry = f"Content of {file} in {directory_path}:\n{content}\n\n"
                entries.append(entry)
    return entries

if __name__ == "__main__":
    # Determine the directory where this script is located.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Set the starting directory for scanning to be the parent of the script's directory.
    start_dir = os.path.abspath(os.path.join(script_dir, ".."))
    
    file_entries = gather_files(start_dir, start_dir)
    output_text = "".join(file_entries)
    
    # Save the output file to the folder where the script is located.
    output_path = os.path.join(script_dir, "content.txt")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_text)
    
    print(f"Content has been saved to {output_path}")
