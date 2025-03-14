<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;

class PaymentController extends Controller
{
    var $apiInstance = null;
    public function __construct() {
        Configuration::setXenditKey("xnd_development_Eh3fZG9pnQfhNTStdR3rSjapYaTWwl2stq1HZadX8TzMwfeHpKwIh6desk4mbp");
        $this->apiInstance = new InvoiceApi();
    }

    public function store(Request $request) {

        $create_invoice_request = new CreateInvoiceRequest([
            "external_id" => $request->external_id,
            "amount" => $request->amount,
            "description" => $request->description,
            "payer_email" => $request->payer_email,
        ]);

        $result = $this->apiInstance->createInvoice($create_invoice_request);

        // Simpan ke Database
        $payment = new Payment();
        $payment->external_id = $create_invoice_request['external_id'];
        $payment->checkout_link = $result['invoice_url'];
        $payment->status = 'pending';
        $payment->save();

        return response()->json($payment);
    }
}
