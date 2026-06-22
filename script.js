const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('projectModalTitle');
const modalDescription = document.querySelector('.project-modal__description');
const modalList = document.querySelector('.project-modal__list');
const modalTech = document.querySelector('.project-modal__tech');
const modalLinks = document.querySelector('.project-modal__links');
const modalClose = document.querySelector('.modal-close');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
    }
  });
});

const updateTheme = () => {
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    updateTheme();
  });
  updateTheme();
}

const projectData = {
  'responsive-shop': {
    title: '响应式产品展示页',
    description: '展示页面支持 PC 与移动端，包含商品卡片、过滤选择和购买引导。该项目注重布局优化与交互体验。',
    points: [
      '流式网格布局，适配不同屏幕',
      '简洁交互按钮和信息展示',
      '高质量视觉层次和按钮状态反馈'
    ],
    tech: 'HTML · CSS · JavaScript',
    links: '<a href="https://github.com/你的用户名" target="_blank" rel="noreferrer">查看源码</a> | <a href="#projects">实时演示</a>'
  },
  'resume-page': {
    title: '个人简历页面',
    description: '语义化简历页面，支持打印和深色模式切换，展示简历信息与技能特长。适合展示职位申请场景。',
    points: [
      '语义标签和可访问性优化',
      '打印友好布局',
      '主题切换与现代排版设计'
    ],
    tech: 'HTML · CSS · 交互动画',
    links: '<a href="https://github.com/你的用户名" target="_blank" rel="noreferrer">查看源码</a> | <a href="#projects">实时演示</a>'
  },
  'todo-app': {
    title: '动态任务清单',
    description: '一个可新增、编辑、完成与本地保存的待办应用，演示原生表单交互与状态管理。适合展示 JS 逻辑能力。',
    points: [
      '本地存储持久化',
      '任务状态切换与删除操作',
      '清晰的交互反馈和布局设计'
    ],
    tech: 'HTML · CSS · JavaScript',
    links: '<a href="https://github.com/你的用户名" target="_blank" rel="noreferrer">查看源码</a> | <a href="#projects">实时演示</a>'
  }
};

const detailButtons = document.querySelectorAll('.project-detail-btn');
detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const projectKey = button.dataset.project;
    const data = projectData[projectKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalList.innerHTML = data.points.map((point) => `<li>${point}</li>`).join('');
    modalTech.textContent = data.tech;
    modalLinks.innerHTML = data.links;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
}

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
