
$(function(){
    const mobileSizeQuery = window.matchMedia('(max-width: 767.98px)');
   mobileSizeQuery.addListener(handleMobileSizeChange);

   // Initial check
   handleMobileSizeChange(mobileSizeQuery);

   // toggle sidebar collapse
   $('.btn-toggle-sidebar').on('click', function(){
       $('.wrapper').toggleClass('sidebar-collapse');
   });
   // mark sidebar item as active when clicked
   $('.nav-item').on('click', function(){
       if ($(this).hasClass('btn-toggle-sidebar')) {
         return; // already actived
       }
       $(this).siblings().removeClass('active');
       $(this).siblings().find('.nav-item').removeClass('active');
       $(this).addClass('active');
   })
});

function handleMobileSizeChange(e) {
   if (e.matches) {
       $('.bottom-bar').removeClass('disabled');
       $('.wrapper').addClass('mobile');
   // Add any additional actions here
   } else {
       $('.bottom-bar').addClass('disabled');
       $('.wrapper').removeClass('mobile');
   // Add any additional actions here
   }
}
