<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Tanding;
use Illuminate\Http\Request;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;

class PaymentController extends Controller
{
    var $apiInstance = null;
    public function __construct()
    {
        Configuration::setXenditKey("xnd_development_Eh3fZG9pnQfhNTStdR3rSjapYaTWwl2stq1HZadX8TzMwfeHpKwIh6desk4mbp");
        $this->apiInstance = new InvoiceApi();
    }

    public function store(Request $request)
    {

        $create_invoice_request = new CreateInvoiceRequest([
            "external_id" => $request->external_id,
            "amount" => $request->amount,
            "description" => $request->description,
            "payer_email" => $request->payer_email,
            "currency" => 'IDR',
            "customer" => array(
                "given_names" => $request->given_names,
                "email" => $request->email,
                "mobile_number" => $request->mobile_number,
                "addresses" => $request->address,
            ),
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

    public function notification(Request $request)
    {
        // Ambil data pembayaran dari database berdasarkan external_id
        $payment = Payment::where('external_id', $request->external_id)->firstOrFail();

        // Cegah update jika pembayaran sudah diproses
        if ($payment->status === 'pending') {
            return response()->json('Pembayaran telah diproses');
        }

        // Ambil status terbaru dari Xendit
        $result = $this->apiInstance->getInvoices(null, $request->external_id);
        $newStatus = strtolower($result[0]['status']); // Convert status ke huruf kecil

        // Update status pembayaran
        $payment->status = $newStatus;
        $payment->save();

        // Jika pembayaran berhasil, update kolom `dibayar` di tabel `tanding`
        if ($newStatus === 'paid') {
            Tanding::where('id', $request->external_id)->update(['dibayar' => true]);
        }

        return response()->json('Success');
    }
}
