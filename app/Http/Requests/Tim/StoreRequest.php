<?php

namespace App\Http\Requests\Tim;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Sesuaikan dengan kebutuhan otorisasi Anda
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'atlet_id_1' => 'required|exists:atlet,id',
            'atlet_id_2' => 'required|exists:atlet,id',
            'nama_tim' => 'required|string',
            'jenis' => 'required|in:CAMPURAN,GANDA,TUNGGAL',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'atlet_id_1.required' => 'Peserta 1 wajib diisi.',
            'atlet_id_1.exists' => 'Peserta 1 tidak ditemukan atau sudah terdaftar.',
            'atlet_id_2.required' => 'Peserta 2 wajib diisi.',
            'atlet_id_2.exists' => 'Peserta 2 tidak ditemukan atau sudah terdaftar.',
            'nama_tim.required' => 'Nama tim wajib diisi.',
            'nama_tim.string' => 'Nama tim harus berupa string.',
            'jenis.required' => 'Jenis wajib diisi.',
            'jenis.in' => 'Jenis harus salah satu dari: Campuran, Ganda, Tunggal.',
        ];
    }
}
