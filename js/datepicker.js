window.initDateRangePicker = (selector, dotNetRef, format) => {
    $(selector).daterangepicker({
        autoUpdateInput: true, // <-- let the input update automatically
        opens: 'center',
        locale: { format: format }
    });

    $(selector).on('apply.daterangepicker', function(ev, picker) {
        // Update input automatically (autoUpdateInput: true may do this)
        // $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));

        // Notify Blazor
        dotNetRef.invokeMethodAsync('SetRange',
            picker.startDate.format(format),
            picker.endDate.format(format)
        );
    });

    $(selector).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
        dotNetRef.invokeMethodAsync('SetRange','', '');
    });
};

window.clearDateRangePicker = (selector) => {
    $(selector).val('');
};
