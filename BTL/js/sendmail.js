document.addEventListener('DOMContentLoaded', () => {
    const mail = document.getElementById('mail');
    const submit = document.getElementById('submit');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        
        const data = {
            mail: mail.value,
        };

        postGoogle(data);
    });

    async function postGoogle(data) {
        const formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeHEYNRhp9ZZkh8SrknY_5qh94spUXFpVERFiI-DsQ_9fO7dg/formResponse";
        const formData = new FormData();
        formData.append('entry.1489140575', data.mail); // Thay thế đúng với entry ID trong Google Forms

        try {
            const response = await fetch(formURL, {
                method: 'POST',
                mode: 'no-cors', // 'no-cors' để không bị chặn bởi chính sách CORS
                body: formData,
            });

            if (response.ok) {
                console.log('Form successfully submitted');
            } else {
                console.log('Error submitting the form');
                alert('Đăng Kí Thành Công')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
