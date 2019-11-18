(function countwords() {

    var countwords = document.getElementById('editor');

    countwords.addEventListener('input', function() {
       
        var countwords = this.textContent,
        count = countwords.trim().replace(/\s+/g, ' ').split(' ').length;
        
        document.getElementById('ac-countword').textContent = count + ' words';
    })
})();

