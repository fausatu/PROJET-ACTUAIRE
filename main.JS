 
        // Smooth scrolling pour les liens de navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation des cartes au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .level, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

        // Menu mobile 
        const navToggle = document.createElement('button');
        navToggle.innerHTML = '☰';
        navToggle.style.display = 'none';
        navToggle.style.background = 'none';
        navToggle.style.border = 'none';
        navToggle.style.color = 'white';
        navToggle.style.fontSize = '1.5rem';
        navToggle.style.cursor = 'pointer';

        //interactions dynamiques
        document.querySelectorAll('.cta-button, .card, .level').forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform + ' scale(1.02)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            });
        });

        // Quiz d'aptitude
        function calculateResult() {
            const form = document.getElementById('aptitudeQuiz');
            const formData = new FormData(form);
            let totalScore = 0;
            let questionsAnswered = 0;

            for (let i = 1; i <= 7; i++) {
                const answer = formData.get(`q${i}`);
                if (answer) {
                    totalScore += parseInt(answer);
                    questionsAnswered++;
                }
            }

            if (questionsAnswered < 7) {
                alert('Veuillez répondre à toutes les questions pour obtenir votre résultat.');
                return;
            }

            const resultDiv = document.getElementById('quizResult');
            const titleEl = document.getElementById('resultTitle');
            const descriptionEl = document.getElementById('resultDescription');
            const adviceEl = document.getElementById('resultAdvice');

            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });

            if (totalScore >= 18) {
                resultDiv.className = 'quiz-result result-excellent';
                titleEl.textContent = '🌟 Excellent ! Vous avez un profil parfait pour l\'Actuariat';
                descriptionEl.textContent = `Score: ${totalScore}/21 - Vos compétences en mathématiques, votre logique analytique et votre intérêt pour la finance font de vous un candidat idéal pour cette filière.`;
                adviceEl.innerHTML = `
                    <div style="margin-top: 1rem;">
                        <h4>🎯 Recommandations :</h4>
                        <ul style="text-align: left; margin-top: 0.5rem;">
                            <li>✅ Vous devriez absolument considérer cette filière</li>
                            <li>📚 Commencez à vous familiariser avec les concepts actuariels</li>
                            <li>💼 Explorez les opportunités de stage dès la première année</li>
                            <li>🏆 Visez l'excellence pour décrocher les meilleures opportunités</li>
                        </ul>
                        <p style="margin-top: 1rem;"><strong>Votre potentiel de réussite : 95%</strong></p>
                    </div>
                `;
            } else if (totalScore >= 12) {
                resultDiv.className = 'quiz-result result-good';
                titleEl.textContent = '👍 Très bon profil ! L\'Actuariat pourrait vous convenir';
                descriptionEl.textContent = `Score: ${totalScore}/21 - Vous avez de bonnes bases et un potentiel réel pour réussir en Actuariat. Avec de la motivation, vous pouvez exceller.`;
                adviceEl.innerHTML = `
                    <div style="margin-top: 1rem;">
                        <h4>🎯 Recommandations :</h4>
                        <ul style="text-align: left; margin-top: 0.5rem;">
                            <li>✅ Cette filière est une bonne option pour vous</li>
                            <li>📖 Renforcez vos bases en mathématiques avant l'entrée</li>
                            <li>💻 Familiarisez-vous avec les outils informatiques</li>
                            <li>🤝 Contactez des professionnels du secteur</li>
                        </ul>
                        <p style="margin-top: 1rem;"><strong>Votre potentiel de réussite : 75%</strong></p>
                    </div>
                `;
            } else if (totalScore >= 7) {
                resultDiv.className = 'quiz-result result-moderate';
                titleEl.textContent = '⚠️ Profil moyen - Réflexion nécessaire';
                descriptionEl.textContent = `Score: ${totalScore}/21 - Votre profil présente quelques lacunes pour l'Actuariat. Cette filière reste possible mais nécessitera des efforts supplémentaires.`;
                adviceEl.innerHTML = `
                    <div style="margin-top: 1rem;">
                        <h4>🎯 Recommandations :</h4>
                        <ul style="text-align: left; margin-top: 0.5rem;">
                            <li>🤔 Réfléchissez bien avant de vous engager</li>
                            <li>📚 Considérez des cours de mise à niveau en maths</li>
                            <li>👥 Rencontrez des étudiants et professionnels</li>
                            <li>🔄 Explorez aussi d'autres filières compatibles</li>
                        </ul>
                        <p style="margin-top: 1rem;"><strong>Votre potentiel de réussite : 45%</strong></p>
                    </div>
                `;
            } else {
                resultDiv.className = 'quiz-result result-moderate';
                titleEl.textContent = '❌ Cette filière ne semble pas adaptée à votre profil';
                descriptionEl.textContent = `Score: ${totalScore}/21 - Votre profil actuel ne correspond pas aux exigences de l'Actuariat. D'autres filières pourraient mieux vous convenir.`;
                adviceEl.innerHTML = `
                    <div style="margin-top: 1rem;">
                        <h4>🎯 Recommandations :</h4>
                        <ul style="text-align: left; margin-top: 0.5rem;">
                            <li>🔍 Explorez d'autres filières (Gestion, Commerce, etc.)</li>
                            <li>💡 Identifiez vos vraies passions et talents</li>
                            <li>📞 Consultez un conseiller d'orientation</li>
                            <li>⏰ Prenez le temps de bien réfléchir à votre avenir</li>
                        </ul>
                        <p style="margin-top: 1rem;"><strong>Autres filières recommandées :</strong><br>
                        Économie-Gestion, Commerce International, Sciences de Gestion</p>
                    </div>
                `;
            }
        }
    