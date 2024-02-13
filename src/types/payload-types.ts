/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page;
    projects: Project;
    categories: Category;
    recruitment: Recruitment;
    applications: Application;
    users: User;
    media: Media;
    forms: Form;
    'form-submissions': FormSubmission;
  };
  globals: {
    'recruitment-settings': RecruitmentSetting;
    settings: Setting;
  };
}
export interface Page {
  id: string;
  title: string;
  slug?: string;
  hero: {
    type: 'banner' | 'intro';
    banner?: {
      title: string;
      description?: {
        [k: string]: unknown;
      }[];
    };
    intro?: {
      slider: {
        media: string | Media;
        id?: string;
      }[];
    };
  };
  sections?: (
    | {
      associates: {
        name: string;
        url?: string;
        image?: string | Media;
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'associates-block';
    }
    | {
      maps: string;
      details: {
        [k: string]: unknown;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'contact';
    }
    | {
      form: string | Form;
      id?: string;
      blockName?: string;
      blockType: 'embed-form';
    }
    | {
      categories?: {
        categories: string | Category;
        link: {
          type?: 'reference' | 'custom';
          label: string;
          reference: {
            value: string | Page;
            relationTo: 'pages';
          };
          url: string;
          newTab?: boolean;
        };
        id?: string;
      }[];
      media: string[] | Category[];
      id?: string;
      blockName?: string;
      blockType: 'gallery-list';
    }
    | {
      type: 'automatic' | 'manual';
      complete: 'wip' | 'complete' | 'both';
      manual: string[] | Project[];
      id?: string;
      blockName?: string;
      blockType: 'projects-list';
    }
    | {
      type: 'automatic' | 'manual';
      manual: string[] | Recruitment[];
      id?: string;
      blockName?: string;
      blockType: 'recruitment-list';
    }
    | {
      align: 'left' | 'center' | 'right';
      richText: {
        [k: string]: unknown;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'rich-text-block';
    }
    | {
      header: {
        title: string;
        description?: {
          [k: string]: unknown;
        }[];
      };
      members: {
        name: string;
        position: string;
        image: string | Media;
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'team-block';
    }
    | {
      text: {
        [k: string]: unknown;
      }[];
      image: string | Media;
      reversed?: boolean;
      id?: string;
      blockName?: string;
      blockType: 'text-image-block';
    }
  )[];
  fullTitle?: string;
  breadcrumbs?: {
    doc?: string | Page;
    url?: string;
    label?: string;
    id?: string;
  }[];
  parent?: string | Page;
  meta?: {
    title?: string;
    description?: string;
    image?: string | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Media {
  id: string;
  alt: string;
  title: string;
  project?: string | Project;
  categories?: string[] | Category[];
  poster: string | Media;
  placeholder?: string;
  prefix?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface Project {
  id: string;
  name: string;
  slug?: string;
  complete?: boolean;
  description: string;
  thumbnail: string | Media;
  categories?: string[] | Category[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Category {
  id: string;
  name: string;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Form {
  id: string;
  title: string;
  fields?: (
    | {
      name: string;
      label: string;
      placeholder?: string;
      defaultValue?: string;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
          minLength: {
            value?: number;
            message: string;
          };
          maxLength: {
            value?: number;
            message: string;
          };
          pattern: {
            value?: string;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'text';
    }
    | {
      name: string;
      label: string;
      placeholder?: string;
      defaultValue?: string;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
          minLength: {
            value?: number;
            message: string;
          };
          maxLength: {
            value?: number;
            message: string;
          };
          pattern: {
            value?: string;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'textarea';
    }
    | {
      name: string;
      label: string;
      options?: {
        label: string;
        value: string;
        id?: string;
      }[];
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        placeholder?: string;
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'select';
    }
    | {
      name: string;
      label: string;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        placeholder?: string;
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
          minLength: {
            value?: number;
            message: string;
          };
          maxLength: {
            value?: number;
            message: string;
          };
          pattern: {
            value?: string;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'email';
    }
    | {
      name: string;
      label: string;
      placeholder?: string;
      defaultValue?: number;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
          min: {
            value?: number;
            message: string;
          };
          max: {
            value?: number;
            message: string;
          };
          pattern: {
            value?: string;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'number';
    }
    | {
      name: string;
      label: string;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        default?: boolean;
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'checkbox';
    }
    | {
      message: {
        [k: string]: unknown;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'message';
    }
    | {
      name: string;
      label: string;
      admin: {
        size:
        | 'column'
        | 'column-three-quarter'
        | 'column-two-thirds'
        | 'column-half'
        | 'column-third'
        | 'column-quarter';
        placeholder?: string;
        rules: {
          required: {
            value?: boolean;
            message: string;
          };
          minLength: {
            value?: number;
            message: string;
          };
          maxLength: {
            value?: number;
            message: string;
          };
          pattern: {
            value?: string;
            message: string;
          };
        };
      };
      id?: string;
      blockName?: string;
      blockType: 'tel';
    }
  )[];
  submitButtonLabel?: string;
  confirmationType?: 'message' | 'redirect';
  confirmationMessage: {
    [k: string]: unknown;
  }[];
  redirect?: {
    type?: 'reference' | 'custom';
    reference: {
      value: string | Page;
      relationTo: 'pages';
    };
    url: string;
  };
  emails?: {
    emailTo?: string;
    cc?: string;
    bcc?: string;
    replyTo?: string;
    emailFrom?: string;
    subject: string;
    message?: {
      [k: string]: unknown;
    }[];
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Recruitment {
  id: string;
  title: string;
  slug?: string;
  description: string;
  details: {
    [k: string]: unknown;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Application {
  id: string;
  name?: string;
  details?: {
    name: string;
    label: string;
    value?: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface User {
  id: string;
  fullname?: string;
  firstname: string;
  lastname: string;
  roles: ('editor' | 'admin')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface FormSubmission {
  id: string;
  form: string | Form;
  submissionData?: {
    field: string;
    value: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
}
export interface RecruitmentSetting {
  id: string;
  emails: {
    emails?: {
      emailTo?: string;
      cc?: string;
      bcc?: string;
      replyTo?: string;
      emailFrom?: string;
      subject: string;
      message?: {
        [k: string]: unknown;
      }[];
      id?: string;
    }[];
  };
  fields: {
    fields?: (
      | {
        name: string;
        label: string;
        placeholder?: string;
        defaultValue?: string;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
            minLength: {
              value?: number;
              message: string;
            };
            maxLength: {
              value?: number;
              message: string;
            };
            pattern: {
              value?: string;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'text';
      }
      | {
        name: string;
        label: string;
        placeholder?: string;
        defaultValue?: string;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
            minLength: {
              value?: number;
              message: string;
            };
            maxLength: {
              value?: number;
              message: string;
            };
            pattern: {
              value?: string;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'textarea';
      }
      | {
        name: string;
        label: string;
        options?: {
          label: string;
          value: string;
          id?: string;
        }[];
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          placeholder?: string;
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'select';
      }
      | {
        name: string;
        label: string;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          placeholder?: string;
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
            minLength: {
              value?: number;
              message: string;
            };
            maxLength: {
              value?: number;
              message: string;
            };
            pattern: {
              value?: string;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'email';
      }
      | {
        name: string;
        label: string;
        placeholder?: string;
        defaultValue?: number;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
            min: {
              value?: number;
              message: string;
            };
            max: {
              value?: number;
              message: string;
            };
            pattern: {
              value?: string;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'number';
      }
      | {
        name: string;
        label: string;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          default?: boolean;
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'checkbox';
      }
      | {
        message: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'message';
      }
      | {
        name: string;
        label: string;
        admin: {
          size:
          | 'column'
          | 'column-three-quarter'
          | 'column-two-thirds'
          | 'column-half'
          | 'column-third'
          | 'column-quarter';
          placeholder?: string;
          rules: {
            required: {
              value?: boolean;
              message: string;
            };
            minLength: {
              value?: number;
              message: string;
            };
            maxLength: {
              value?: number;
              message: string;
            };
            pattern: {
              value?: string;
              message: string;
            };
          };
        };
        id?: string;
        blockName?: string;
        blockType: 'tel';
      }
    )[];
  };
  _status?: 'draft' | 'published';
  updatedAt?: string;
  createdAt?: string;
}
export interface Setting {
  id: string;
  sitename: string;
  siteURL: string;
  logo: string | Media;
  metadata: {
    title: string;
    suffix: string;
    description: string;
    author: string;
    ogImage: string | Media;
    keywords: {
      name: string;
      id?: string;
    }[];
  };
  social: {
    social?: {
      name: string;
      url: string;
      icons:
      | 'bxl-kubernetes'
      | 'bxl-snapchat'
      | 'bxl-yelp'
      | 'bxl-discourse'
      | 'bxl-internet-explorer'
      | 'bxl-git'
      | 'bxl-creative-commons'
      | 'bxl-dev-to'
      | 'bxl-medium-old'
      | 'bxl-ok-ru'
      | 'bxl-yahoo'
      | 'bxl-amazon'
      | 'bxl-jsfiddle'
      | 'bxl-kickstarter'
      | 'bxl-blender'
      | 'bxl-firefox'
      | 'bxl-visa'
      | 'bxl-spring-boot'
      | 'bxl-product-hunt'
      | 'bxl-airbnb'
      | 'bxl-bootstrap'
      | 'bxl-quora'
      | 'bxl-soundcloud'
      | 'bxl-c-plus-plus'
      | 'bxl-markdown'
      | 'bxl-codepen'
      | 'bxl-flickr-square'
      | 'bxl-flickr'
      | 'bxl-wikipedia'
      | 'bxl-wordpress'
      | 'bxl-python'
      | 'bxl-stack-overflow'
      | 'bxl-baidu'
      | 'bxl-bing'
      | 'bxl-stripe'
      | 'bxl-shopify'
      | 'bxl-foursquare'
      | 'bxl-microsoft'
      | 'bxl-mailchimp'
      | 'bxl-digg'
      | 'bxl-redux'
      | 'bxl-edge'
      | 'bxl-dropbox'
      | 'bxl-google-cloud'
      | 'bxl-javascript'
      | 'bxl-joomla'
      | 'bxl-telegram'
      | 'bxl-zoom'
      | 'bxl-drupal'
      | 'bxl-microsoft-teams'
      | 'bxl-tux'
      | 'bxl-angular'
      | 'bxl-firebase'
      | 'bxl-spotify'
      | 'bxl-opera'
      | 'bxl-unsplash'
      | 'bxl-vuejs'
      | 'bxl-chrome'
      | 'bxl-trello'
      | 'bxl-wix'
      | 'bxl-whatsapp-square'
      | 'bxl-500px'
      | 'bxl-react'
      | 'bxl-deviantart'
      | 'bxl-nodejs'
      | 'bxl-digitalocean'
      | 'bxl-django'
      | 'bxl-less'
      | 'bxl-sass'
      | 'bxl-invision'
      | 'bxl-periscope'
      | 'bxl-squarespace'
      | 'bxl-html5'
      | 'bxl-ebay'
      | 'bxl-magento'
      | 'bxl-css3'
      | 'bxl-paypal'
      | 'bxl-mastercard'
      | 'bxl-dailymotion'
      | 'bxl-windows'
      | 'bxl-tumblr'
      | 'bxl-google-plus'
      | 'bxl-android'
      | 'bxl-skype'
      | 'bxl-twitter'
      | 'bxl-vimeo'
      | 'bxl-github'
      | 'bxl-messenger'
      | 'bxl-blogger'
      | 'bxl-discord'
      | 'bxl-facebook-square'
      | 'bxl-medium'
      | 'bxl-pinterest'
      | 'bxl-bitcoin'
      | 'bxl-youtube'
      | 'bxl-vk'
      | 'bxl-pocket'
      | 'bxl-linkedin'
      | 'bxl-google-plus-circle'
      | 'bxl-whatsapp'
      | 'bxl-reddit'
      | 'bxl-apple'
      | 'bxl-dribbble'
      | 'bxl-behance'
      | 'bxl-instagram'
      | 'bxl-facebook'
      | 'bxl-twitch'
      | 'bxl-slack-old'
      | 'bxl-medium-square'
      | 'bxl-linkedin-square'
      | 'bxl-slack'
      | 'bxl-play-store'
      | 'bxl-google'
      | 'bxl-etsy'
      | 'bxl-algolia'
      | 'bxl-adobe'
      | 'bxl-imdb'
      | 'bxl-visual-studio'
      | 'bxl-flutter'
      | 'bxl-mastodon'
      | 'bxl-patreon'
      | 'bxl-sketch'
      | 'bxl-go-lang'
      | 'bxl-upwork'
      | 'bxl-docker'
      | 'bxl-redbubble'
      | 'bxl-figma'
      | 'bxl-discord-alt'
      | 'bxl-php'
      | 'bxl-99designs'
      | 'bxl-meta'
      | 'bxl-aws'
      | 'bxl-unity'
      | 'bxl-gitlab'
      | 'bxl-tailwind-css'
      | 'bxl-steam'
      | 'bxl-audible'
      | 'bxl-jquery'
      | 'bxl-pinterest-alt'
      | 'bxl-facebook-circle'
      | 'bxl-instagram-alt'
      | 'bxl-tiktok'
      | 'bxl-trip-advisor'
      | 'bxl-netlify'
      | 'bxl-heroku'
      | 'bxl-flask'
      | 'bxl-venmo'
      | 'bxl-gmail'
      | 'bxl-java'
      | 'bxl-deezer'
      | 'bxl-xing'
      | 'bxl-mongodb'
      | 'bxl-postgresql'
      | 'bxl-graphql'
      | 'bxl-typescript';
      id?: string;
    }[];
  };
  navigation: {
    items: {
      type: 'link' | 'subMenu' | 'auto';
      label: string;
      subMenu?: {
        sublink: {
          link: {
            type?: 'reference' | 'custom';
            label: string;
            reference: {
              value: string | Page;
              relationTo: 'pages';
            };
            url: string;
            newTab?: boolean;
          };
          id?: string;
        }[];
      };
      link?: {
        type?: 'reference' | 'custom' | 'email' | 'phone';
        reference: {
          value: string | Page;
          relationTo: 'pages';
        };
        url: string;
        email: string;
        phone: string;
        newTab?: boolean;
      };
      auto?: {
        name: 'categories' | 'recruitment';
        baseURL: string;
        sublink?: {
          link: {
            type?: 'reference' | 'custom';
            label: string;
            reference: {
              value: string | Page;
              relationTo: 'pages';
            };
            url: string;
            newTab?: boolean;
          };
          id?: string;
        }[];
      };
      id?: string;
    }[];
  };
  config: {
    projectsPerPage: number;
  };
  _status?: 'draft' | 'published';
  updatedAt?: string;
  createdAt?: string;
}
