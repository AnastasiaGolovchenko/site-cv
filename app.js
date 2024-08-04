let i = 0;
        document.querySelectorAll('.editable').forEach(element => {
            addDataKey(element);
        });
        function addDataKey(element) {
            element.dataset.key = i++;
        }
      document.querySelectorAll('.editable').forEach(element => {
          element.addEventListener('click', () => {
              const currentText = element.innerText;
              element.innerHTML = `<input type="text" style = "font-size:1.2em; width:300px" value="${currentText}">`;
              element.querySelector('input').focus();

              element.querySelector('input').addEventListener('blur', () => {
                  const newText = element.querySelector('input').value;
                  element.innerHTML = newText;
                  localStorage.setItem(element.dataset.key, newText);
              });
          });
      });
      document.querySelectorAll('.editable').forEach(element => {
          const savedText = localStorage.getItem(element.dataset.key);
          if (savedText) {
              element.innerText = savedText;
          }
      });


      document.querySelector('.ripple').addEventListener('click',function(e){
        e.target.blur();
        e.target.focus();
      })

      document.getElementById('btnToPdf').addEventListener('click', function() {
            const { jsPDF } = window.jspdf;

            html2canvas(document.getElementById('app')).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210; 
                const imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('site.pdf');

              
            });
        });