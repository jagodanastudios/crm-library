import { AuthApis } from './auth/auth.service';
import { AuthConfigsApis } from './auth/configs.service';
import { AuthMethodsApis } from './auth/methods.service';
import { AuthSettingsApis } from './auth/settings.service';
import { BlogPostApis } from './blogs/blogs.service';
import { BlogAuthorsApis } from './blogs/blogsAuthors.service';
import { BlogFolderApis } from './blogs/blogsFolders.service';
import { BlogTagsApis } from './blogs/blogsTags.service';
import { DocPostApis } from './docs/docs.service';
import { DocAuthorsApis } from './docs/docsAuthors.service';
import { DocFolderApis } from './docs/docsFolders.service';
import { DocTagsApis } from './docs/docsTags.service';
import { FormsApis } from './forms/forms.service';

const API_HELPER = {
  auth: {
    auth: new AuthApis(),
    settings: new AuthSettingsApis(),
    methods: new AuthMethodsApis(),
    configs: new AuthConfigsApis(),
  },
  blogs: {
    posts: new BlogPostApis(),
    folders: new BlogFolderApis(),
    authors: new BlogAuthorsApis(),
    tags: new BlogTagsApis(),
  },
  docs: {
    posts: new DocPostApis(),
    folders: new DocFolderApis(),
    authors: new DocAuthorsApis(),
    tags: new DocTagsApis(),
  },
  forms: new FormsApis(),
};

export default API_HELPER;
