// 1        
$('#treeview-container').treeview({
debug : true,
data : ['', '', '']
});
$('#show-values').on('click', function(){
$('#values').text(
$('#treeview-container').treeview('selectedValues')
);
});
