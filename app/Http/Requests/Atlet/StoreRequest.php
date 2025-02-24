<?php

namespace App\Http\Requests\Atlet;

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
            'name' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:LAKI_LAKI,PEREMPUAN',
            'nik' => 'required|digits:16|unique:atlet,nik',
            'no_kk' => 'required|digits:16|unique:atlet,no_kk',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'berat_badan' => 'nullable|numeric|min:1|max:999.99',
            'tinggi_badan' => 'nullable|numeric|min:1|max:999.99',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib diisi.',
            'jenis_kelamin.in' => 'Jenis kelamin harus salah satu dari: LAKI_LAKI, PEREMPUAN.',
            'nik.required' => 'NIK wajib diisi.',
            'nik.digits' => 'NIK harus 16 digit.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'no_kk.required' => 'No KK wajib diisi.',
            'no_kk.digits' => 'No KK harus 16 digit.',
            'no_kk.unique' => 'No KK sudah terdaftar.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.date' => 'Tanggal lahir harus berupa tanggal yang valid.',
            'tempat_lahir.required' => 'Tempat lahir wajib diisi.',
            'tempat_lahir.string' => 'Tempat lahir harus berupa string.',
            'tempat_lahir.max' => 'Tempat lahir maksimal 255 karakter.',
            'berat_badan.numeric' => 'Berat badan harus berupa angka.',
            'berat_badan.min' => 'Berat badan minimal 1.',
            'berat_badan.max' => 'Berat badan maksimal 999.99.',
            'tinggi_badan.numeric' => 'Tinggi badan harus berupa angka.',
            'tinggi_badan.min' => 'Tinggi badan minimal 1.',
            'tinggi_badan.max' => 'Tinggi badan maksimal 999.99.',
        ];
    }
}
