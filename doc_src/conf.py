# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Minotaur'
copyright = '2024, Alexey Vlasov Licensed under the Apache License, Version 2.0'
author = 'Alexey Vlasov'
release = 'v0.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'en'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "sphinx_rtd_theme"
html_static_path = ['_static']

html_favicon = "_static/favicon.png"
html_logo = "_static/Minotaur_Logo.svg"

html_theme_options = {
  "style_nav_header_background" : "#40a9ed"
}

extensions = [
  'myst_parser',
  'breathe',
  'sphinx.ext.duration',
  'sphinx.ext.autodoc',
  'sphinx.ext.autosummary',
  'sphinx.ext.viewcode',
  'sphinx_markdown_tables',
  'hoverxref.extension',
  'versionwarning.extension',
  'sphinx_copybutton',
  'sphinx_rtd_theme',
  'sphinx_tabs.tabs',
]

myst_enable_extensions = [
    "amsmath",
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",
]

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
source_suffix = ['.rst', '.md']
# source_suffix = '.rst'

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# A list of ignored prefixes for module index sorting.
#modindex_common_prefix = []

# If true, keep warnings as "system message" paragraphs in the built documents.
#keep_warnings = False

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = True
