## Jx3box-ui-react

为dps计算器等其它react前端业务线做准备

需要对公共组件生产一个react版本

首批只移植重要的几个模块

原vue2版本 https://github.com/JX3BOX/jx3box-common-ui

## Install

```code
npm install @jx3box/jx3box-ui-react
```


```code
yarn add @jx3box/jx3box-ui-react
```

## Usage

```javascript
import { Layout } from '@jx3box/jx3box-ui-react';

const App = () => (
     <Layout>
        <Header />
        <Breadcrumb 
            name='频道名称' 
            slug='slug' 
            root='/slug' 
            logo={<Jx3Logo />}
        >
            bread info
        </Breadcrumb>

        <LeftSidebar>
            left sidebar content
        </LeftSidebar>

        <Main>
            <Thx 
                postType='tool'
                postId={31129} 
                userId={59236} 
            />
            <RightSidebar>
                RightSidebar content
            </RightSidebar>
            <Footer />
        </Main>
    </Layout>
);
```

## Layout

请确保 `Layout` 组件在最外层

因为 `LeftSidebar`, `RightSidebar`, `Main`, `BreadCrumb` 等会影响

页面布局的组件需要被 `Layout` 组件包裹才能正确计算相应的 `css`

- `Layout`: 总布局容器 内部实现Jx3BoxContext计算布局尽量放在最外层渲染

- `LeftSidebar`: 左侧边栏 自带收放功能和默认样式 放在 `Layout` 内部才能正确计算

- `Main`: 主显示区域 放在 `Layout` 内部才能正确计算

- `RightSidebar`: 右侧边栏触发小屏时激活流式布局 放在 `Layout` 内部才能正确计算


### 代码演示

```javascript
import { Layout, BreadCrumb } from '@jx3box/jx3box-ui-react';

const { LeftSidebar, RightSidebar, Main } = Layout;

export default () => (
    <Layout>
        <Breadcrumb name='频道名称' slug='slug' root='/slug'>
            bread content
        </Breadcrumb>

        <LeftSidebar>
            LeftSidebar content
        </LeftSidebar>

        <Main>
            <RightSidebar>
                RightSidebar content
            </RightSidebar>
        </Main>
    </Layout>
);
```

## Breadcrumb

魔盒面包屑组件

请确保被 `Layout` 组件包裹


### 代码演示

```javascript
import { Layout, Breadcrumb } from '@jx3box/jx3box-ui-react';

export default () => (
    <Layout>
        <Breadcrumb 
            name='频道名称'
            slug='slug' 
            root='/slug' 
            logo={<Jx3Logo />} 
        >
            custom breadcrumb info
        </Breadcrumb>
    </Layout>
);
```

| props | detail | type | default |
| :---- | :---- | :---- | :---- |
| name | 面包屑标题 | string | - |
| root | 点击面包屑标题跳转的链接 | string | - |
| slug | 组装发布按钮的请求地址 | string | - |
| logo | logo图片 | ReactNode | - |
| crumbEnable | 是否显示 crumbBE 组件 | boolean | undefined |
| publishEnable | 是否显示发布按钮 | boolean | true |
| feedbackEnable | 是否显示反馈按钮 | boolean | true |

## Thx

功能区组件

### 代码演示

```javascript
import { Layout, Header } from '@jx3box/jx3box-ui-react';

export default () => (
    <Thx postId={31129} postType='tool' userId={59236} />
);
```

| props | detail | type | default |
| :---- | :---- | :---- | :---- |
| postType | 文章类型 | string | number | - |
| postId | 文章id | string | number | - |
| userId | 发布文章的作者id | string | number | - |

## Header

魔盒公共头部组件

请确保被 `Layout` 组件包裹

### 代码演示

```javascript
import { Layout, Header } from '@jx3box/jx3box-ui-react';

export default () => (
    <Layout>
        <Header />
    </Layout>
);
```

## Footer

魔盒公共底部组件

### 代码演示

```javascript
import { Footer } from '@jx3box/jx3box-ui-react';

export default () => (
    <Layout>
        <Footer/>
    </Layout>
);
```

## 开发相关

`StoryBook` 查看组件库

```code
npm run storybook
```

本地开发

```code
npm run dev
```
