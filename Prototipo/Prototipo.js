        // Datos de ejemplo para la demostración
        const sampleData = {
            indicators: [
                {
                    id: 1,
                    status: "Activo",
                    status2: "Nuevo",
                    process: "Gestión de Calidad",
                    responsible: "Juan Pérez",
                    description: "Mide el porcentaje de cumplimiento de los procedimientos establecidos",
                    unit: "Porcentaje",
                    impact: "Obj 1",
                    object: "Cliente Interno",
                    goal: "95%",
                    strategy: "Reducción de no conformidades",
                    methodology: "Evaluación mensual",
                    procedure: "PRO-CAL-001",
                    frequency: "Mensual",
                    code: "IND-CAL-001",
                    objectives: "Mejorar la eficiencia de los procesos"
                },
                {
                    id: 2,
                    status: "Activo",
                    status2: "Antiguo",
                    process: "Atención al Cliente",
                    responsible: "María García",
                    description: "Mide el nivel de satisfacción del cliente con nuestros servicios",
                    unit: "Escala 1-10",
                    impact: "Obj 2",
                    object: "Cliente Externo",
                    goal: "8.5",
                    strategy: "Mejora continua",
                    methodology: "Encuesta de satisfacción",
                    procedure: "PRO-ATN-002",
                    frequency: "Trimestral",
                    code: "IND-ATN-001",
                    objectives: "Aumentar la satisfacción del cliente"
                }
            ],
            audits: [
                {
                    id: 1,
                    name: "Auditoría Interna de Calidad Q1",
                    process: "Gestión de Calidad",
                    date: "2023-04-15",
                    auditor: "Carlos López",
                    status: "Completada",
                    description: "Auditoría interna del sistema de gestión de calidad"
                },
                {
                    id: 2,
                    name: "Auditoría de Procesos Q2",
                    process: "Atención al Cliente",
                    date: "2023-06-20",
                    auditor: "Ana Rodríguez",
                    status: "Programada",
                    description: "Auditoría de procesos de atención al cliente"
                }
            ],
            processes: [
                {
                    id: 1,
                    name: "Gestión de Calidad",
                    code: "PRO-CAL",
                    description: "Proceso de gestión del sistema de calidad",
                    responsible: "Juan Pérez",
                    status: "Activo"
                },
                {
                    id: 2,
                    name: "Atención al Cliente",
                    code: "PRO-ATN",
                    description: "Proceso de atención y soporte al cliente",
                    responsible: "María García",
                    status: "Activo"
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Luis Martínez",
                    email: "luis.martinez@empresa.com",
                    department: "Calidad",
                    position: "Analista de Calidad",
                    process: "Gestión de Calidad",
                    status: "Activo"
                },
                {
                    id: 2,
                    name: "Sofia Ramírez",
                    email: "sofia.ramirez@empresa.com",
                    department: "Atención a Clientes",
                    position: "Especialista en Servicio",
                    process: "Atención al Cliente",
                    status: "Activo"
                }
            ]
        };

        // Almacenamiento local
        let appData = JSON.parse(localStorage.getItem('qualityweb360_data')) || sampleData;
        let currentUser = JSON.parse(localStorage.getItem('qualityweb360_user')) || null;

        // Inicialización de la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            // Verificar si hay un usuario logueado
            if (currentUser) {
                showLobby();
                updateUserDisplay();
            } else {
                showLogin();
            }
            
            // Cargar datos en las tablas
            loadIndicatorsTable();
            loadAuditsTable();
            loadProcessesTable();
            loadUsersTable();
            updateDashboardCounts();
            
            // Configurar eventos
            setupEventListeners();
        });

        // Configuración de event listeners
        function setupEventListeners() {
            // Navegación
            document.getElementById('show-register').addEventListener('click', showRegister);
            document.getElementById('show-login').addEventListener('click', showLogin);
            document.getElementById('enter-system').addEventListener('click', enterSystem);
            document.getElementById('logout-btn').addEventListener('click', logout);
            
            // Formularios de login y registro
            document.getElementById('loginForm').addEventListener('submit', login);
            document.getElementById('registerForm').addEventListener('submit', register);
            
            // Navegación del sidebar
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const target = this.getAttribute('data-target');
                    showModule(target);
                });
            });
            
            // Botones de acceso rápido desde el dashboard
            const dashboardButtons = document.querySelectorAll('[data-module]');
            dashboardButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const module = this.getAttribute('data-module');
                    showModule(module);
                });
            });
            
            // Botones de volver al dashboard
            const backButtons = document.querySelectorAll('.back-to-dashboard');
            backButtons.forEach(button => {
                button.addEventListener('click', function() {
                    showModule('dashboard');
                });
            });
            
            // Gestión de indicadores
            document.getElementById('add-indicator-btn').addEventListener('click', showIndicatorForm);
            document.getElementById('cancel-indicator').addEventListener('click', hideIndicatorForm);
            document.getElementById('indicatorForm').addEventListener('submit', saveIndicator);
            document.getElementById('export-indicators').addEventListener('click', exportIndicatorsToCSV);
            
            // Gestión de auditorías
            document.getElementById('add-audit-btn').addEventListener('click', showAuditForm);
            document.getElementById('cancel-audit').addEventListener('click', hideAuditForm);
            document.getElementById('auditForm').addEventListener('submit', saveAudit);
            
            // Gestión de procesos
            document.getElementById('add-process-btn').addEventListener('click', showProcessForm);
            document.getElementById('cancel-process').addEventListener('click', hideProcessForm);
            document.getElementById('processForm').addEventListener('submit', saveProcess);
            
            // Gestión de usuarios
            document.getElementById('add-user-btn').addEventListener('click', showUserForm);
            document.getElementById('cancel-user').addEventListener('click', hideUserForm);
            document.getElementById('userForm').addEventListener('submit', saveUser);
            
            // Generación de reportes
            document.getElementById('generate-indicator-report').addEventListener('click', function() {
                exportIndicatorsToCSV();
            });
            document.getElementById('generate-audit-report').addEventListener('click', function() {
                exportAuditsToCSV();
            });
            document.getElementById('generate-user-report').addEventListener('click', function() {
                exportUsersToCSV();
            });
        }

        // Funciones de navegación
        function showLogin() {
            document.getElementById('login').style.display = 'flex';
            document.getElementById('register').style.display = 'none';
            document.getElementById('lobby').style.display = 'none';
            document.getElementById('main-system').style.display = 'none';
        }

        function showRegister() {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'flex';
            document.getElementById('lobby').style.display = 'none';
            document.getElementById('main-system').style.display = 'none';
        }

        function showLobby() {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            document.getElementById('lobby').style.display = 'flex';
            document.getElementById('main-system').style.display = 'none';
        }

        function enterSystem() {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            document.getElementById('lobby').style.display = 'none';
            document.getElementById('main-system').style.display = 'flex';
        }

        function showModule(moduleId) {
            // Ocultar todos los módulos
            const modules = document.querySelectorAll('.module-detail');
            modules.forEach(module => {
                module.classList.remove('active');
            });
            
            // Mostrar el módulo seleccionado
            document.getElementById(`${moduleId}-content`).classList.add('active');
            
            // Actualizar el título de la página
            document.querySelector('.page-title').textContent = 
                document.querySelector(`#${moduleId}-content .module-title`).textContent;
            
            // Actualizar la navegación
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === moduleId) {
                    item.classList.add('active');
                }
            });
        }

        function updateUserDisplay() {
            if (currentUser) {
                document.getElementById('user-display-name').textContent = currentUser.name;
            }
        }

        // Funciones de autenticación
        function login(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Validación simple (en una aplicación real, esto se haría en el servidor)
            if (username === 'admin' && password === 'password') {
                currentUser = {
                    name: 'Administrador',
                    username: 'admin',
                    role: 'admin'
                };
                localStorage.setItem('qualityweb360_user', JSON.stringify(currentUser));
                showLobby();
                updateUserDisplay();
            } else {
                alert('Usuario o contraseña incorrectos. Use admin/password para acceder como administrador.');
            }
        }

        function register(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // En una aplicación real, esto se enviaría al servidor
            alert(`Usuario ${username} registrado con éxito. Ahora puede iniciar sesión.`);
            showLogin();
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('qualityweb360_user');
            showLogin();
        }

        // Funciones para la gestión de datos
        function updateDashboardCounts() {
            document.getElementById('indicators-count').textContent = appData.indicators.length;
            document.getElementById('audits-count').textContent = appData.audits.length;
            document.getElementById('processes-count').textContent = appData.processes.length;
            document.getElementById('users-count').textContent = appData.users.length;
        }

        function loadIndicatorsTable() {
            const tbody = document.querySelector('#indicators-table tbody');
            tbody.innerHTML = '';
            
            appData.indicators.forEach(indicator => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${indicator.status}</td>
                    <td>${indicator.process}</td>
                    <td>${indicator.responsible}</td>
                    <td>${indicator.description}</td>
                    <td>${indicator.unit}</td>
                    <td>
                        <button class="action-btn btn-edit" data-id="${indicator.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn btn-delete" data-id="${indicator.id}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners a los botones de acción
            document.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    editIndicator(id);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    deleteIndicator(id);
                });
            });
        }

        function loadAuditsTable() {
            const tbody = document.querySelector('#audits-table tbody');
            tbody.innerHTML = '';
            
            appData.audits.forEach(audit => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${audit.name}</td>
                    <td>${audit.process}</td>
                    <td>${audit.date}</td>
                    <td>${audit.auditor}</td>
                    <td>${audit.status}</td>
                    <td>
                        <button class="action-btn btn-edit" data-id="${audit.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn btn-delete" data-id="${audit.id}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function loadProcessesTable() {
            const tbody = document.querySelector('#processes-table tbody');
            tbody.innerHTML = '';
            
            appData.processes.forEach(process => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${process.code}</td>
                    <td>${process.name}</td>
                    <td>${process.responsible}</td>
                    <td>${process.status}</td>
                    <td>
                        <button class="action-btn btn-edit" data-id="${process.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn btn-delete" data-id="${process.id}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function loadUsersTable() {
            const tbody = document.querySelector('#users-table tbody');
            tbody.innerHTML = '';
            
            appData.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.department}</td>
                    <td>${user.position}</td>
                    <td>${user.process}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="action-btn btn-edit" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn btn-delete" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // Funciones para formularios de indicadores
        function showIndicatorForm() {
            document.getElementById('indicator-form').style.display = 'block';
            document.getElementById('add-indicator-btn').style.display = 'none';
        }

        function hideIndicatorForm() {
            document.getElementById('indicator-form').style.display = 'none';
            document.getElementById('add-indicator-btn').style.display = 'block';
            document.getElementById('indicatorForm').reset();
        }

        function saveIndicator(e) {
            e.preventDefault();
            
            const newIndicator = {
                id: appData.indicators.length > 0 ? Math.max(...appData.indicators.map(i => i.id)) + 1 : 1,
                status: document.getElementById('indicator-status').value,
                status2: document.getElementById('indicator-status2').value,
                process: document.getElementById('indicator-process').value,
                responsible: document.getElementById('indicator-responsible').value,
                description: document.getElementById('indicator-description').value,
                unit: document.getElementById('indicator-unit').value,
                impact: document.getElementById('indicator-impact').value,
                object: document.getElementById('indicator-object').value,
                goal: document.getElementById('indicator-goal').value,
                strategy: document.getElementById('indicator-strategy').value,
                methodology: document.getElementById('indicator-methodology').value,
                procedure: document.getElementById('indicator-procedure').value,
                frequency: document.getElementById('indicator-frequency').value,
                code: document.getElementById('indicator-code').value,
                objectives: document.getElementById('indicator-objectives').value
            };
            
            appData.indicators.push(newIndicator);
            localStorage.setItem('qualityweb360_data', JSON.stringify(appData));
            
            loadIndicatorsTable();
            updateDashboardCounts();
            hideIndicatorForm();
            
            alert('Indicador guardado con éxito');
        }

        function editIndicator(id) {
            // Implementar la edición de indicadores
            alert(`Editar indicador con ID: ${id}`);
        }

        function deleteIndicator(id) {
            if (confirm('¿Está seguro de que desea eliminar este indicador?')) {
                appData.indicators = appData.indicators.filter(indicator => indicator.id !== parseInt(id));
                localStorage.setItem('qualityweb360_data', JSON.stringify(appData));
                
                loadIndicatorsTable();
                updateDashboardCounts();
                
                alert('Indicador eliminado con éxito');
            }
        }

        // Funciones para exportar a CSV
        function exportToCSV(data, filename) {
            const csvContent = "data:text/csv;charset=utf-8," 
                + data.map(row => Object.values(row).join(",")).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            
            link.click();
            document.body.removeChild(link);
        }

        function exportIndicatorsToCSV() {
            const dataForCSV = appData.indicators.map(indicator => ({
                'Código': indicator.code,
                'Status': indicator.status,
                'Status 2': indicator.status2,
                'Proceso': indicator.process,
                'Responsable': indicator.responsible,
                'Descripción': indicator.description,
                'Unidad de medida': indicator.unit,
                'Objetivo de impacto': indicator.impact,
                'Principal Objeto': indicator.object,
                'Meta objetivo': indicator.goal,
                'Estrategia': indicator.strategy,
                'Metodología': indicator.methodology,
                'Procedimiento': indicator.procedure,
                'Frecuencia de medición': indicator.frequency,
                'Objetivos': indicator.objectives
            }));
            
            exportToCSV(dataForCSV, 'indicadores_calidad.csv');
        }

        function exportAuditsToCSV() {
            const dataForCSV = appData.audits.map(audit => ({
                'Nombre': audit.name,
                'Proceso': audit.process,
                'Fecha': audit.date,
                'Auditor': audit.auditor,
                'Estado': audit.status,
                'Descripción': audit.description
            }));
            
            exportToCSV(dataForCSV, 'auditorias.csv');
        }

        function exportUsersToCSV() {
            const dataForCSV = appData.users.map(user => ({
                'Nombre': user.name,
                'Email': user.email,
                'Departamento': user.department,
                'Cargo': user.position,
                'Proceso': user.process,
                'Estado': user.status
            }));
            
            exportToCSV(dataForCSV, 'usuarios_auditados.csv');
        }

        // Funciones para otros formularios (simplificadas para la demostración)
        function showAuditForm() {
            document.getElementById('audit-form').style.display = 'block';
            document.getElementById('add-audit-btn').style.display = 'none';
        }

        function hideAuditForm() {
            document.getElementById('audit-form').style.display = 'none';
            document.getElementById('add-audit-btn').style.display = 'block';
            document.getElementById('auditForm').reset();
        }

        function saveAudit(e) {
            e.preventDefault();
            alert('Auditoría guardada (función de demostración)');
            hideAuditForm();
        }

        function showProcessForm() {
            document.getElementById('process-form').style.display = 'block';
            document.getElementById('add-process-btn').style.display = 'none';
        }

        function hideProcessForm() {
            document.getElementById('process-form').style.display = 'none';
            document.getElementById('add-process-btn').style.display = 'block';
            document.getElementById('processForm').reset();
        }

        function saveProcess(e) {
            e.preventDefault();
            alert('Proceso guardado (función de demostración)');
            hideProcessForm();
        }

        function showUserForm() {
            document.getElementById('user-form').style.display = 'block';
            document.getElementById('add-user-btn').style.display = 'none';
        }

        function hideUserForm() {
            document.getElementById('user-form').style.display = 'none';
            document.getElementById('add-user-btn').style.display = 'block';
            document.getElementById('userForm').reset();
        }

        function saveUser(e) {
            e.preventDefault();
            alert('Usuario guardado (función de demostración)');
            hideUserForm();
        }