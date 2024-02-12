$(document).ready(function(){
    // FETCHING ITEMS 
    var table = $('#deactivatedItemsTable').DataTable({
        "ajax": "ajax/save/fetchItem.php",
        "columns": [
            { "data": "name" },
            { "data": "description" },
            { "data": "quantity" },
            { "data": "price" },
            {
                "data": null,
                "defaultContent": "<button class='btn btn-danger deleteBtn'>Delete</button> <button class='btn btn-primary editBtn'>Edit</button> <button class='btn btn-danger deactivateBtn'>Deactivate</button>"
            }
        ],
        order: [[0, 'ASC']] 
    });
  
    // ADDING ITEM USING MODAL FORM 
    $('#exampleModal').on('click', '#addItem', function(event){
        event.preventDefault();
        var formData = $('#modalForm').serialize();
        $.ajax({
            url: 'ajax/save/addItem.php',
            type: 'POST',
            data: formData,
            success: function(){
                $('#exampleModal').modal('hide');
                table.ajax.reload();
            },
            error: function(){
                alert('Error occurred while adding item');
            }
        });
    });
  
    // DELETING ITEM
    $('#deactivatedItemsTable').on('click', '.deleteBtn', function(){
        var data = table.row($(this).parents('tr')).data();
        var itemId = data.id; // Assuming your item ID column is named 'id'
        $.ajax({
            url: 'ajax/save/deleteItem.php',
            type: 'POST',
            data: { id: itemId },
            success: function(){
                table.ajax.reload();
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                alert('Error occurred while deleting item: ' + error); // Display more detailed error message
            }
        });
    });
  
    // EDITING ITEM
    $('#deactivatedItemsTable').on('click', '.editBtn', function(){
        var data = table.row($(this).parents('tr')).data();
        // Populate edit modal form with data
        $('#editName').val(data.name);
        $('#editDescription').val(data.description);
        $('#editQuantity').val(data.quantity);
        $('#editPrice').val(data.price);
        $('#editItemId').val(data.id);
        // Show edit modal
        $('#editModal').modal('show');
    });
  
    // UPDATING ITEM
    $('#updateItem').on('click', function(){
        var formData = $('#editModalForm').serialize();
        $.ajax({
            url: 'ajax/save/updateItem.php',
            type: 'POST',
            data: formData,
            success: function(){
                $('#editModal').modal('hide');
                table.ajax.reload();
            },
            error: function(){
                alert('Error occurred while updating item');
            }
        });
    });
  
// DEACTIVATING ITEM
$('#deactivatedItemsTable').on('click', '.deactivateBtn', function(){
    var $btn = $(this);
    var data = table.row($btn.parents('tr')).data();
    var itemId = data.id;
    $.ajax({
        url: 'ajax/save/deactivateItem.php',
        type: 'POST',
        data: { id: itemId }, // Ensure 'id' parameter is included
        success: function(){
            table.ajax.reload(); // Reload the table to update the deactivated items
        },
        error: function(xhr, status, error){
            console.error(xhr.responseText);
            alert('Error occurred while deactivating item: ' + error);
        }
    });
});

});
