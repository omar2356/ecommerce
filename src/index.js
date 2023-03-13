import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/js/all.min'
import { data } from 'jquery';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').click(function(){
        alert("أضيف المُنتج إلى عربة الشراء");
    });

    $("#copyright").text(" جميع الحقوق محفوظة للمتجر سنة "   + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass("active");
        $(this).parents('.product-option').addClass('active');
    });
    
    // عند تغيير كمية المنتج
    $('[data-product-quantity]').change(function(){
        var newQuantity = $(this).val();
        // اجلب الكمية الجديدية
        var parent = $(this).parents('[data-product-info]');
        // ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var price = parent.attr('data-product-price');
        // السعر الاجمالي للمنتج هو سعر القطعة مضوربا بعددها
        var totla = newQuantity * price;
        // عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
        parent.find('.total-price-for-product').text(totla + '$')
        // حدث السعر الاجمالي لكل المنتجات 
        totalPrice()
    });



    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        // اعد حساب السعر الاجمالي بعد حذف احد المنتاجات 
        totalPrice();
    });

    


    function totalPrice() {
        // ننشء متغير جديد لحفظ السعر الاجمالي
        var totalAllPrice = 0;
        // لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function(){
            
            // اجلب سعر القطعة الواحدة من الخاصية الموافقة 
            var price = $(this).attr("data-product-price");
            // اجلب كمية المنتج من حقل اختيار الكمية 
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPrice = price * quantity;

            // اضف السعر الاجمال لهذا المنتج الى السعر الاجمالي لكل المنتجات واحفط القيمة في المتغير نفسه 
            totalAllPrice = totalAllPrice * (totalPrice);
             
   // حدث السعر الاجمالي لكل المنتجات في الصفحة 

            
        });

        $('#total-price-for-all-products').text(totalAllPrice + '$')

       
    }

});
