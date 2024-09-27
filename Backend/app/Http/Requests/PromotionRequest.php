<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromotionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => 'required|string|unique:promotions,code',
            'discount' => 'required|numeric',
            'discount_type' => 'required|string',
            'minimum_spend' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'usage_limit' => 'required|numeric',
            'status' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            'code.unique' => 'Mã code bị trùng vui lòng nhập mã code khác',
            'code.required' => 'Không được để trống',
            'discount.required' => 'Không được để trống',
            'discount_type.required' => 'Không được để trống',
            'minimum_spend.required' => 'Không được để trống',
            'start_date.required' => 'Không được để trống',
            'end_date.required' => 'Không được để trống',
            'end_date.after' => 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
            'usage_limit.required' => 'Không được để trống',
            'status.required' => 'Không được để trống',
        ];
    }
}
