/* -------------------------------------------------------------
 * Interactive Logic - yeondoo0407 Portfolio
 * Features: Mobile Nav, Canvas Ambient Particles, Category Filters,
 *           Comprehensive Modal System for Projects, Experiences & Certs
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars.forEach(bar => bar.style.transform = 'none');
                if (bars[1]) bars[1].style.opacity = '1';
            });
        });
    }

    // 3. Scrollspy (Highlight active menu item on scroll)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 4. Ambient Canvas Particles
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = `rgba(163, 230, 53, ${this.opacity})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }

    // 5. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects-container .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. Comprehensive Data Source for Modal (Projects, Exps, Certs)
    // -------------------------------------------------------------
    const projectsData = {
        'proj-contest': {
            tag: 'Data Analytics',
            tagClass: 'tag-analytics',
            title: 'OTT(TVING) vs 영화관(CGV) 비즈니스 구조 및 재무 안정성 분석',
            period: '2025.09.29 ~ 2025.11.08',
            role: '데이터 수집 및 전처리, 통계 분석(3인 팀)',
            tools: 'Python (OLS 회귀분석), Excel, DART 전자공시시스템',
            background: '2025 경영 데이터 분석 경진대회 출품작으로, 구독 기반 OTT 플랫폼(TVING)과 전통 극장 산업(CJ CGV)의 수익 모델 차이가 코로나19와 같은 거시경제적 외부 충격 및 위기 극복 탄력성에 미치는 영향을 재무적 관점에서 실증 규명하고자 했습니다.',
            actions: [
                '금융감독원 전자공시시스템(DART)에서 2019~2024년 분기별 재무제표를 추출하여 엑셀 기반 데이터셋 구축',
                '분기별 매출액, 영업이익, 총자산, 부채비율, 당기순이익 변수에서 불필요한 결측치 및 비정상치를 정제하는 전처리 수행',
                '피어슨 상관분석을 통해 ROA(총자산이익률)와 ROE(자기자본이익률)의 높은 다중공선성을 확인하고, 수익성 대표 지표로 ROA를 채택',
                'Python Statsmodels OLS 모듈을 활용하여 단순 및 다중선형 회귀분석 모델을 구축하고 가설 검증 진행',
                '예상과 달리 초기 가설 일부가 기각된 원인을 분석하기 위해, OTT 오리지널 콘텐츠 제작비 상각 주기 및 감가상각비의 회계적 특성을 추가 파악하여 논리적 해석 제시'
            ],
            results: [
                '단순 데이터 비교에 그치지 않고, 가설 검증 실패 요인을 기업 회계 구조와 투자 특성으로 역추적하는 깊이 있는 분석력 발휘',
                '경영 데이터 분석 경진대회 1차 통과 및 팀 내 정량적 데이터 분석 핵심 역량 입증'
            ],
            deliverables: [
                { name: '📄 분석 보고서 PDF 열람', url: 'assets/projects/data_contest_2025.pdf', isPdf: true }
            ]
        },
        'proj-philips': {
            tag: 'Strategy & MIS',
            tagClass: 'tag-strategy',
            title: '필립스(Philips) 디지털 헬스케어 MIS 전략 및 플랫폼 전환 제안',
            period: '2026.03.02 ~ 2026.05.19',
            role: '시장 분석, CRM 전략 및 HaaS 비즈니스 모델 설계(4인 팀)',
            tools: '경영정보시스템(MIS), CRM 분석, SWOT, Gartner 분석',
            background: '전통 가전 기업에서 디지털 헬스케어 전문 솔루션 기업으로 혁신을 꾀한 필립스의 사업 구조와 정보시스템(MIS) 전략을 분석하고, 향후 병원·개인 간 의료 데이터 파편화를 극복하기 위한 차세대 통합 플랫폼 전략을 제안했습니다.',
            actions: [
                '필립스의 연혁 및 재무 실적을 분석하고, 의료기기용(B2B)과 개인용 헬스케어(B2C) 시장의 고객 세그먼트와 경쟁사(지멘스, GE헬스케어) 사업구조 비교',
                '기존 필립스의 고객 관계 관리(CRM) 방식과 데이터 분절 문제를 파악하여 SWOT 분석 도출',
                '데이터 무결성과 보안을 강화하기 위한 블록체인 기반 분산 의료정보 시스템(MIS) 아키텍처 제안',
                '병원과 개인을 연결하는 통합 건강 데이터 생태계를 구축하고, 장비 일회성 판매에서 구독형 건강관리인 HaaS(Healthcare as a Service) 의료 플랫폼으로의 전환 로드맵 설계'
            ],
            results: [
                '경영 전략과 IT 기술의 접점을 실무 수준으로 구조화하여 학과 전공 과제 최고 평가 달성',
                'B2B와 B2C가 융합된 복합 비즈니스 모델에서의 CRM 데이터 파이프라인 설계 역량 습득'
            ],
            deliverables: [
                { name: '📄 발표자료 PDF 열람', url: 'assets/projects/philips_mis.pdf', isPdf: true }
            ]
        },
        'proj-dolphiners': {
            tag: 'Strategy & Org',
            tagClass: 'tag-strategy',
            title: '크리에이티브 기업 "돌고래유괴단" 조직문화 및 경영전략 분석',
            period: '2025.03.20 ~ 2025.05.15',
            role: '현직 감독 심층 인터뷰 기획/진행, 재무 데이터 분석, SWOT 전략 도출(7인 팀)',
            tools: '심층 인터뷰(In-depth Interview), 4개년 재무제표 분석, SWOT 분석, PPTX',
            background: '기존 광고업계의 불문율을 깨고 바이럴 영상의 새로운 문법을 창조한 콘텐츠 제작사 ‘돌고래유괴단’의 독창적 조직문화와 경영 전략을 분석하기 위해 기획된 프로젝트입니다.',
            actions: [
                '돌고래유괴단 현직 연출 감독(서대원 PD)과 직접 연락하여 섭외 후 심층 대면 인터뷰 수행',
                '영업 조직 없이 콘텐츠 파급력만으로 수주를 이끄는 인바운드 비즈니스 모델 규명',
                '광고주의 개입을 배제한 창작 독립성, 전 직원 참여 ‘슈퍼패스’ 채용, 직급 파괴 호칭 문화 등 조직문화 분석',
                '단순 하청 제작사에 머무르지 않고 매체 집행 부서를 신설해 대행 수수료까지 내재화한 종합 대행사 전환 과정 분석',
                '돌고래유괴단 4개년 재무 데이터를 분석하여 고정비 부담과 인하우스 대행사 대비 리스크 요인을 진단하고, AI 도입 공정 효율화 및 장기 파트너십 구축 SWOT 전략 제안'
            ],
            results: [
                '현직 인터뷰를 바탕으로 교과서적 이론을 넘어선 생생한 현장 중심의 조직 혁신 프로세스 규명',
                '조직 분석과 정량적 재무 분석을 결합한 다각도 전략 보고서 완성 및 성공적 발표'
            ],
            deliverables: [
                { name: '📄 현직 PD 인터뷰 녹취 및 전문 PDF', url: 'assets/projects/dolphiners_interview.pdf', isPdf: true },
                { name: '📊 거시조직론 발표자료 PPTX 다운로드', url: 'assets/projects/dolphiners_org_ppt.pptx', isDownload: true }
            ]
        },
        'proj-travel': {
            tag: 'Business Planning',
            tagClass: 'tag-strategy',
            title: '사용자 맞춤형 여행 일정 설계 및 VR 사전체험 플랫폼 "여행갈까"',
            period: '2024.09.19 ~ 2024.12.05',
            role: '4인 팀 조장(PM), 서비스 기획, 마일스톤 간트차트 및 추정 손익계산서 모델링',
            tools: 'Gantt Chart, Excel (Financial Modeling), 손익계산서, 시장조사',
            background: '개인 맞춤화 트렌드와 실시간 데이터 기술을 결합하여, 여행 전 VR로 동선을 미리 체험하고 AI가 개인 맞춤형 스케줄을 자동으로 최적화해 주는 여행 플랫폼 ‘여행갈까’의 사업 타당성 및 런칭 계획을 수립했습니다.',
            actions: [
                '4인 팀의 조장으로서 전체 프로젝트 일정 관리, 역할 분담 및 피드백 조율 총괄',
                '시장조사부터 UI/UX 기획, 개발, 베타테스트, 공식 배포까지 서비스 런칭을 위한 12단계 마일스톤 간트차트 정밀 설계',
                '인건비, 서버/개발 장비 임차료, 연구개발비, 마케팅 프로모션 비용 등 초기 소요 자금을 추정하여 현실적인 자금조달 계획 수립',
                '예상 사용자 유입률, 수수료 수익 및 광고 매출을 기반으로 향후 3개년 추정 손익계산서(P&L) 시뮬레이션 모델링 구축'
            ],
            results: [
                '아이디어 제안에 그치지 않고, 현실적인 일정과 회계·재무적 숫자로 사업 실행 가능성을 완벽히 검증',
                '팀원 간 의견 차이를 조율하고 각 영역의 결과물을 하나의 완성도 높은 사업계획서로 집약하는 프로젝트 매니징 역량 발휘'
            ],
            deliverables: [
                { name: '📄 사업계획서 과제 PDF 열람', url: 'assets/projects/travel_startup_biz.pdf', isPdf: true }
            ]
        },
        'proj-scm': {
            tag: 'SCM Operations',
            tagClass: 'tag-strategy',
            title: '지속가능경영 전략 및 글로벌 스마트 공급망(SCM) 구축 사례 연구',
            period: '2024.03.18 ~ 2024.05.27',
            role: '글로벌 기업 SCM 사례 분석 및 미래형 공급망 네트워크 프레임워크 도출(6인 팀)',
            tools: 'SCM 분석, Bullwhip Effect 모델, ESG 프레임워크, PPT',
            background: '지정학적 리스크, 환경 규제, 공급망 단절 위기 속에서 지속가능경영을 달성하기 위해 경제적(탄력 SCM), 환경적(그린 SCM), 사회적(상생 SCM) 관점의 통합 공급망 혁신 방안을 도출하고자 했습니다.',
            actions: [
                '경제적 관점: 노키아와 삼성SDS 사례를 조사하여 실시간 데이터 센싱 및 디지털 컨트롤타워 기반의 공급망 복원력(Resilience) 분석',
                '환경적 관점: 현대자동차의 폐배터리 순환 라이프사이클과 월마트의 블록체인 기반 식품 유통기한 추적 및 탄소 배출 저감 체계 분석',
                '사회적 관점: 포드의 ABF(공급망 동반성장)와 도요타의 협력사 상생 모델을 Carroll의 CSR 모델과 연계하여 분석',
                '생산, 물류, 창고가 유기적으로 연결되는 미래 지향적 스마트 SCM 통합 네트워크 모델 제시'
            ],
            results: [
                '글로벌 선도 기업들의 SCM 혁신 요인을 3대 지속가능성 축으로 체계화',
                '공급망 내 비효율과 채찍효과(Bullwhip Effect)를 줄이는 정량적 운영 전략 수립 역량 강화'
            ],
            deliverables: [
                { name: '📄 SCM 연구 발표자료 PDF 열람', url: 'assets/projects/scm_sustainability.pdf', isPdf: true }
            ]
        },
        'proj-p5': {
            tag: 'Creative Coding',
            tagClass: 'tag-tech',
            title: 'p5.js 인터랙티브 그래픽 & 생성형 AI 활용 웹페이지 제작 프로젝트',
            period: '2026.03.02 ~ 2026.06.08',
            role: '인터랙티브 그래픽스 코딩, AI 프롬프트 엔지니어링, 웹 포트폴리오 구축 및 배포',
            tools: 'p5.js, JavaScript, HTML5 Canvas, Google Antigravity, GitHub Pages',
            background: '코딩과 인터랙티브 미디어를 비즈니스 웹 환경에 접목하기 위해 p5.js를 활용한 인터랙티브 그래픽 작품을 직접 구현하고, Google Antigravity AI와의 자연어 협업을 통해 포트폴리오 웹사이트를 구축 및 배포하는 프로젝트입니다.',
            actions: [
                '마우스 궤적, 클릭 및 키보드 입력에 반응하여 동적으로 변화하는 p5.js 그래픽 알고리즘 4종 코딩',
                'Google Antigravity를 활용하여 자연어 대화로 UI/UX 요구사항, 색상 팔레트, 반응형 그리드 프롬프트를 반복 고도화',
                '작성한 크리에이티브 코드와 생성형 AI 결과물을 통합하고 GitHub Pages로 웹서비스 배포 완료',
                '자연어 기반 AI 협업 워크플로우를 통해 아이디어를 실제 프로덕트로 기획·개발·개선하는 전 과정 주도'
            ],
            results: [
                '라이브 웹사이트 성공적 런칭 및 인터랙티브 크리에이티브 코딩 역량 검증',
                '디자인 감각과 테크놀로지를 융합한 차별화된 포트폴리오 자산 확보'
            ],
            deliverables: [
                { name: '🔗 p5.js 과제 전시 웹사이트 열기 (GitHub Pages)', url: 'https://yeondoo0407.github.io/yondoo0407-p5-assignments/', isExternal: true }
            ]
        },
        'proj-divorce': {
            tag: 'Data Analytics',
            tagClass: 'tag-analytics',
            title: '공공데이터를 활용한 사회적 현상(이혼율 감소 원인) 분석',
            period: '2023.09.04 ~ 2023.12.21',
            role: '4인 팀 팀장, 가설 설정, 데이터 수집 및 Python 시각화 분석 총괄',
            tools: 'Python, Google Colab, Matplotlib/Seaborn, 통계청 공공데이터',
            background: '‘이혼율이 지속적으로 감소하는 현상’의 이면에 주목하여, 단순한 관계 안정화가 아닌 ‘혼인 건수 자체의 급감’이 주요인일 것이라는 가설을 세우고 공공데이터를 통해 다각도로 분석했습니다.',
            actions: [
                '통계청 마이크로데이터 포털에서 시도별 혼인 건수, 이혼 건수, 비혼 사유 조사 데이터를 직접 수집 및 결합',
                'Python과 Google Colab을 활용하여 연도별 추이 꺾은선 그래프, 지역별 막대그래프, 비혼 사유 파이차트로 다차원 시각화',
                '분석 범위를 사회경제적 지표로 확장하여 청년층 고용 불안정성 및 소비자 물가지수 데이터를 교차 분석',
                '팀장으로서 팀원별 분석 역할을 분담하고 회의를 주재하며 일관된 분석 스토리라인과 최종 결론 도출'
            ],
            results: [
                '직관적 추측을 통계 데이터와 사회경제적 지표의 상관관계로 증명해내는 데이터 리터러시 역량 배양',
                '팀장으로서 프로젝트 기획부터 코드 리뷰, 보고서 작성 및 발표까지 전 과정 리드'
            ],
            deliverables: [
                { name: '📊 사회 데이터 분석 발표 PPTX 다운로드', url: 'assets/projects/divorce_analysis_ppt.pptx', isDownload: true },
                { name: '📄 분석 최종 보고서 HWP 다운로드', url: 'assets/projects/divorce_analysis_report.hwp', isDownload: true }
            ]
        },
        'proj-rpg': {
            tag: 'Software Dev',
            tagClass: 'tag-tech',
            title: 'Python 객체지향 기반 텍스트 RPG 게임 프로그램 개발',
            period: '2023.03.02 ~ 2023.06.04',
            role: '5인 팀 팀장, 게임 코어 아키텍처 및 전투 루프 클래스 코딩, 발표 자료 제작',
            tools: 'Python (OOP, Class), winsound 모듈, time 모듈, Word 보고서',
            background: '컴퓨팅적 사고와 코딩기초 교과목의 기말 프로젝트로, Python의 객체지향 프로그래밍(OOP) 패러다임을 적용하여 사용자와 상호작용하는 텍스트 RPG 게임을 개발했습니다.',
            actions: [
                '5인 팀 팀장으로 전체 게임 구조를 설계하고 팀원별로 미니게임(가위바위보, 스무고개 등)을 구현하도록 조율',
                'Player 클래스와 Enemy 클래스를 설계하여 체력(HP), 공격력, 방어력, 스킬 속성을 캡슐화',
                'while 반복문과 조건문을 결합하여 턴제 전투 로직, 도망치기, 랜덤 데미지 산출 알고리즘 구현',
                'time 모듈을 활용한 텍스트 딜레이 효과 및 winsound 라이브러리를 통한 레트로 효과음을 결합하여 콘솔 환경의 몰입감 극대화'
            ],
            results: [
                '클래스 상속, 모듈화, 예외 처리 등 파이썬 프로그래밍 기초를 탄탄히 다짐',
                '팀원들의 코드를 하나의 통합 프로그램으로 병합하고 디버깅하는 소프트웨어 협업 능력 향상'
            ],
            deliverables: [
                { name: '💻 파이썬 소스코드 (python_rpg.py) 다운로드', url: 'assets/projects/python_rpg.py', isDownload: true },
                { name: '📄 프로젝트 최종 개발보고서 Word 다운로드', url: 'assets/projects/python_rpg_report.docx', isDownload: true }
            ]
        },
        'proj-esg': {
            tag: 'ESG Strategy',
            tagClass: 'tag-strategy',
            title: '용인시산업진흥원 ESG 경영 아이디어 공모전 (커피찌꺼기 수거함)',
            period: '2024.08.15 ~ 2024.08.18',
            role: '아이디어 구체화, 커피찌꺼기 발생 데이터 통계 모델링 및 제안서 작성',
            tools: 'Excel (정량적 산출식 모델링), ESG 프레임워크, 한글(HWP)',
            background: '환경 보호와 자원 순환을 위한 용인시산업진흥원 공모전으로, ‘커피찌꺼기(원두박) 전용 분리 수거함 개발 및 친환경 순환 시스템 구축’을 제안했습니다.',
            actions: [
                '단순 아이디어 제안에 그치지 않기 위해 서울 및 경기 권역의 일일 커피 소비량과 커피찌꺼기 배출량 공공데이터 조사',
                '엑셀 함수와 수식을 활용하여 거점별 예상 수거량과 수거 비용, 폐기물 처리비 절감액을 수치 모델링',
                '원두박 매립 시 발생하는 메탄가스 저감량 및 수질 정화 효과를 정량적으로 계산하여 제안서에 반영',
                '팀원들과 역할을 분담하여 조사를 체계화하고 최종 제안서 및 발표 문서를 완성도 높게 제작'
            ],
            results: [
                '비즈니스 제안서에 데이터 기반의 객관적 근거와 기대효과를 부여하는 역량 입증',
                '환경(E) 영역에서의 실질적인 자원 순환 아이디어를 체계화'
            ],
            deliverables: [
                { name: '📄 공모전 제안서 HWP 다운로드', url: 'assets/projects/esg_coffee_proposal.hwp', isDownload: true }
            ]
        }
    };

    const experienceData = {
        'exp-hackers': {
            badge: '산학인턴',
            title: '해커스 챔프스터디 (교육기획 3팀)',
            period: '2025.12.29 ~ 2026.02.28',
            role: '온라인 플랫폼 관리 & 마케팅 콘텐츠 기획 인턴',
            organization: '챔프스터디 (해커스 어학원/인강 전문 교육기업)',
            background: '수험생들의 합격을 지원하는 해커스 공식 네이버 카페 커뮤니티와 공식 블로그를 운영하며, 고객 니즈에 부합하는 타깃 맞춤형 콘텐츠와 시즌 프로모션을 기획·집행했습니다.',
            actions: [
                '수험생들의 질문과 게시글을 상시 모니터링하여 학습 수준과 목표 시점에 맞는 1:1 맞춤형 수험 교재 및 전략 제안',
                '데일리 주요 뉴스 브리핑, 자격증 퀴즈, 취업 공고 등 타깃 맞춤형 정보성 데일리 콘텐츠를 매일 작성하여 카페 유입 활성화',
                '시즌별 프로모션 및 이벤트 기획, 홍보물 및 카드뉴스 직접 제작, 당첨자 상품 전달 프로세스 총괄',
                '네이버 카페, 오픈채팅방 등 주요 채널별 홍보 URL 클릭률(CTR)과 유입 데이터를 매일 추적·기록',
                '엑셀을 활용해 핵심 성과 지표(KPI) 보고서를 작성하고 정기 보고를 수행하여 데이터 기반의 성과 분석 역량 체득',
                'AI 기반 디지털 전환 툴을 활용해 업무 내용을 사전 검증하고 효율적인 보고 체계를 수립'
            ],
            results: [
                '정해진 마감기한과 스케줄을 철저히 준수하며 시간 엄수와 체계적인 온라인 플랫폼 관리 역량 입증',
                '정량적 유입 데이터 추적을 통해 마케팅 캠페인의 개선 포인트를 도출하는 실무 능력 배양'
            ],
            deliverables: []
        },
        'exp-frame': {
            badge: '동아리 임원진',
            title: '숭실대학교 사진편집 동아리 FRAME',
            period: '2025.03.02 ~ 2025.11.10',
            role: '출사장 & SNS 공식 홍보 기획 담당',
            organization: '숭실대학교 중앙 사진편집 동아리 FRAME',
            background: '동아리 부원들의 출사 활동을 기획·운영하고, 공식 인스타그램 채널을 전략적으로 리뉴얼하여 부원 유입과 대외 인지도를 높이고자 했습니다.',
            actions: [
                '출사장으로서 매주 금요일 출사 장소를 선정하고, 참여 인원과 이동 동선을 사전에 면밀히 고려한 일정 계획표를 제작하여 공유',
                '동아리 인스타그램 피드의 톤앤매너, 색감, 폰트 스타일을 통일감 있게 재정비하는 브랜딩 가이드라인 기획',
                '공식 행사 공지 및 출사 활동 결과물을 가독성 높은 카드뉴스로 직접 제작하여 업로드',
                '매월 초 부원들의 사진을 대상으로 한 달력 공모전 행사를 주관하고 우수작 선정 달력 포스터 제작',
                '동아리 박람회 및 교내 축제 부스 운영에 필요한 홍보 포스터 및 부스 디스플레이 제작'
            ],
            results: [
                '인스타그램 피드 리뉴얼 및 톤앤매너 재정비 결과 게시물 조회수 50%(약 3,000회) 증가 달성',
                '부원들의 참여도를 높이고 대외적인 동아리 브랜드 이미지를 전문적으로 구축'
            ],
            deliverables: []
        },
        'exp-cx': {
            badge: '현장 운영 & CX',
            title: '고객 경험(CX) 및 매장 운영 관리',
            period: '2024.07.24 ~ 2026.04.30 (약 3년간 지속)',
            role: '메가커피 & 파리바게뜨 장기 근무',
            organization: '식음료(F&B) 프랜차이즈 매장 현장 운영',
            background: '단순한 아르바이트를 넘어 비즈니스의 최전선에서 고객의 미세한 불편과 행동 양식을 관찰하고, 데이터와 현장 감각으로 매출과 운영 효율을 극대화하는 배움의 현장으로 임했습니다.',
            actions: [
                '상권 분석: 초·중·고 인근 상권 특성을 파악하여 평일(학생 고객 위주)과 주말(직장인·가족 단위 고객 위주)의 연령대별 소비 패턴 분석',
                '데이터 기반 추천: 고객의 취향과 시간대별 선호도를 선제적으로 파악하여 맞춤형 메뉴 추천 제공',
                '주말 인기 메뉴 판매 자발적 재개: 직원 부담으로 중단되었던 주말 인기 메뉴를 고객 만족을 위해 자발적으로 재개하여 주말 매출 증대에 직접 기여',
                '인스타그램 등 SNS 트렌드 음료 모니터링을 통해 본사 발주 전략에 반영할 수 있는 아이디어 제안',
                '바쁜 피크타임 동료 간 업무 동선과 역할을 재조정하여 고객 대기 시간을 획기적으로 단축'
            ],
            results: [
                '한곳에서 오래 일하며 증명한 높은 성실성과 책임감 체득',
                '현장의 작은 비효율을 발견하고 이를 개선해 고객 만족과 매출 성과로 연결하는 실천적 CX 역량 확립'
            ],
            deliverables: []
        },
        'exp-student-council': {
            badge: '교내 자치활동',
            title: '국제통상학과 학생회 BGM',
            period: '2022.03.02 ~ 2022.12.31',
            role: '미디어국원 (SNS 채널 운영 및 홍보 콘텐츠 제작)',
            organization: '명지대학교 국제통상학과 학생회',
            background: '학과 학우들과의 원활한 소통을 도모하고, 학생회 주요 행사와 복지 혜택의 인지도를 제고하기 위해 미디어 콘텐츠를 기획·제작했습니다.',
            actions: [
                '학과 공식 인스타그램 계정을 전담 관리하며 공지사항, 행사 일정, 복지 혜택을 카드뉴스로 제작',
                '신입생 오리엔테이션 홍보 시 ‘학생회비를 내면 누릴 수 있는 실질적인 혜택’을 학생의 눈높이에서 공감할 수 있도록 시각화한 포스터 및 영상 제작',
                '학과 축제 부스 콘셉트 기획 및 홍보 배너, 리플릿 디자인 제작',
                '학생회 내부 구성원들과 일정 및 게시 스케줄을 조율하며 원활한 협업 프로세스 유지'
            ],
            results: [
                '학생 관점의 혜택 중심 홍보를 통해 학과 신입생 학생회비 납부율을 50% 이상으로 대폭 끌어올리는 쾌거 달성',
                '타깃의 심리를 파악하고 행동 변화를 유도하는 커뮤니케이션의 위력을 실감'
            ],
            deliverables: []
        }
    };

    const certificatesData = {
        'cert-adsp': {
            title: '데이터분석준전문가 (ADsP)',
            agency: '한국데이터산업진흥원',
            date: '2026.06.05',
            number: 'ADsP-049010317',
            desc: '데이터 이해, 데이터 분석 기획, 데이터 분석 실무(R/통계 분석) 역량을 공인받은 국가공인 데이터 전문 자격입니다.',
            imgUrl: 'assets/certificates/adsp.png'
        },
        'cert-com2': {
            title: '컴퓨터활용능력 2급',
            agency: '대한상공회의소',
            date: '2025.08.12',
            number: '25-K9-050014',
            desc: '스프레드시트(엑셀) 실무 데이터 입력, 표 작성, 함수 계산, 데이터베이스 관리 등 OA 실무 처리 역량을 인증받은 국가공인 자격입니다.',
            imgUrl: 'assets/certificates/com_2nd.png'
        },
        'cert-mos': {
            title: 'MOS Excel 2016 Expert',
            agency: 'Microsoft Corporation',
            date: '2025.06.10',
            number: 'oRrn-uST5',
            desc: 'Microsoft에서 주관하는 엑셀 최고 등급 국제 공인 자격으로, 고급 수식, 데이터 피벗 분석, 매크로 등 전문적인 비즈니스 분석 역량을 증명합니다.',
            pdfUrl: 'assets/certificates/mos_excel.pdf'
        },
        'cert-acc': {
            title: '회계관리 2급 (국가공인)',
            agency: '삼일회계법인',
            date: '2024.08.02',
            number: '2-116-00188',
            desc: '재무상태표, 손익계산서 등 기업 재무제표의 기본 원리와 계정과목, 회계 순환 과정을 체계적으로 이해하고 있음을 검증받은 국가공인 자격입니다.',
            pdfUrl: 'assets/certificates/accounting_2nd.pdf'
        },
        'cert-history': {
            title: '한국사능력검정시험 1급',
            agency: '국사편찬위원회',
            date: '2026.08.21',
            number: '79-102957',
            desc: '교육부 국사편찬위원회에서 주관하는 한국사능력검정시험 제79회 심화 1급에 합격한 공식 인증서입니다.',
            imgUrl: 'assets/certificates/history_1st.png'
        },
        'cert-opic': {
            title: 'OPIc (영어 말하기) IM2',
            agency: 'ACTFL (미국외국어교육위원회)',
            date: '2026.09.07 (만료일: 2028.09.06)',
            number: 'H6RT-3MFF-9525-PQKJ-QAJ3',
            desc: '일상적이고 친숙한 사회적·비즈니스 상황에서 자연스럽게 문장을 조합하여 의사를 명확히 표현할 수 있는 글로벌 커뮤니케이션 역량을 인증받았습니다.',
            imgUrl: 'assets/certificates/opic_im2.jpg'
        }
    };

    // -------------------------------------------------------------
    // 7. Modal Open & Close Controller
    // -------------------------------------------------------------
    const modal = document.getElementById('detail-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContentArea = document.getElementById('modal-content-area');

    function openModalWithContent(htmlContent) {
        if (!modal || !modalContentArea) return;
        modalContentArea.innerHTML = htmlContent;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Project Card Clicks
    document.querySelectorAll('[data-project-id]').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project-id');
            const data = projectsData[id];
            if (!data) return;

            let deliverablesHtml = '';
            if (data.deliverables && data.deliverables.length > 0) {
                deliverablesHtml = `
                    <div class="modal-section modal-deliverables-box">
                        <h4 class="modal-section-title"><span>📁</span> 관련 산출물 및 문서 보기</h4>
                        <div class="deliverables-btn-group">
                            ${data.deliverables.map(d => `
                                <a href="${d.url}" ${d.isExternal || d.isPdf ? 'target="_blank"' : ''} ${d.isDownload ? 'download' : ''} class="modal-btn ${d.isPdf ? 'modal-btn-primary' : 'modal-btn-download'}">
                                    ${d.name}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            const html = `
                <span class="modal-header-tag">${data.tag}</span>
                <h2 class="modal-title">${data.title}</h2>
                
                <div class="modal-meta-grid">
                    <div class="modal-meta-item">
                        <span class="label">진행 기간</span>
                        <span class="val">${data.period}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">수행 역할</span>
                        <span class="val">${data.role}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">활용 도구 / 기술</span>
                        <span class="val">${data.tools}</span>
                    </div>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>📌</span> 프로젝트 배경 및 기획 의도</h4>
                    <p class="modal-desc-p">${data.background}</p>
                </div>

                <div class="modal-actions-box">
                    <h4 class="modal-section-title"><span>⚡</span> 내가 취한 구체적 행동 및 핵심 기여</h4>
                    <ul class="modal-action-list">
                        ${data.actions.map(act => `<li>${act}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>🏆</span> 주요 성과 및 배운 점</h4>
                    <ul class="modal-results-list">
                        ${data.results.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                </div>

                ${deliverablesHtml}
            `;

            openModalWithContent(html);
        });
    });

    // Handle Experience Card Clicks
    document.querySelectorAll('[data-exp-id]').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-exp-id');
            const data = experienceData[id];
            if (!data) return;

            const html = `
                <span class="modal-header-tag">${data.badge}</span>
                <h2 class="modal-title">${data.title}</h2>
                
                <div class="modal-meta-grid">
                    <div class="modal-meta-item">
                        <span class="label">활동 기간</span>
                        <span class="val">${data.period}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">소속 / 역할</span>
                        <span class="val">${data.role}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">조직 구분</span>
                        <span class="val">${data.organization}</span>
                    </div>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>📌</span> 활동 개요 및 조직 배경</h4>
                    <p class="modal-desc-p">${data.background}</p>
                </div>

                <div class="modal-actions-box">
                    <h4 class="modal-section-title"><span>⚡</span> 담당 직무 및 실행한 구체적 행동</h4>
                    <ul class="modal-action-list">
                        ${data.actions.map(act => `<li>${act}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>🏆</span> 조직 기여 성과 및 체득한 역량</h4>
                    <ul class="modal-results-list">
                        ${data.results.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                </div>
            `;

            openModalWithContent(html);
        });
    });

    // Handle Certificate Card Clicks
    document.querySelectorAll('[data-cert-id]').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-cert-id');
            const data = certificatesData[id];
            if (!data) return;

            let pdfBtn = '';
            if (data.pdfUrl) {
                pdfBtn = `
                    <div style="margin-top: 1.2rem;">
                        <a href="${data.pdfUrl}" target="_blank" class="modal-btn modal-btn-primary">
                            📄 공식 인증서 PDF 원본 열람
                        </a>
                    </div>
                `;
            }

            let previewContent = '';
            if (data.pdfUrl) {
                previewContent = `
                    <iframe class="cert-preview-iframe" src="${data.pdfUrl}" title="${data.title} 인증서"></iframe>
                `;
            } else if (data.imgUrl) {
                previewContent = `
                    <div class="cert-preview-img-wrapper">
                        <img src="${data.imgUrl}" alt="${data.title} 인증 내역">
                    </div>
                `;
            }

            const html = `
                <span class="modal-header-tag">공인 자격 인증</span>
                <h2 class="modal-title">${data.title}</h2>
                
                <div class="modal-meta-grid">
                    <div class="modal-meta-item">
                        <span class="label">발급 / 인증기관</span>
                        <span class="val">${data.agency}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">취득 일자</span>
                        <span class="val">${data.date}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="label">자격 / 인증 번호</span>
                        <span class="val">${data.number}</span>
                    </div>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>📌</span> 자격 내용 및 검증 역량</h4>
                    <p class="modal-desc-p">${data.desc}</p>
                </div>

                ${pdfBtn}

                <div class="modal-section">
                    <h4 class="modal-section-title"><span>🔍</span> 자격 증빙 확인</h4>
                    ${previewContent}
                </div>
            `;

            openModalWithContent(html);
        });
    });

});
