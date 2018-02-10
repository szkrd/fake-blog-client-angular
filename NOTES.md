environments.ts

`ng build --env=prod`

ng g component components/posts-page
ng g component components/post-page
ng g component components/profile-page
ng g component components/post-item
ng g component components/tags-widget
ng g component components/search
ng g component components/header
ng g component components/user-menu

## router

`<base href="/">`

app.module.ts:
import { RouterModule, Routes } from '@angular/router';

---

## using require

npm install --save @types/node

## migrating an existing project to scss

.angular-cli.json

apps styles -> "styles.scss"
defaults styleExt -> "scss"
